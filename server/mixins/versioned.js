'use strict';
const R = require('ramda');

function createCancellationToken(statusCode = 500, message = 'An unknown error has occurred.') {
	let token;
	if (message instanceof Error) token = message;
	else token = new Error(message);
	token.statusCode = statusCode;
	return token;
}

module.exports = (Model, options) => {
	Model.defineProperty('versionNumber', {type: 'number', default: 0});
	Model.defineProperty('deleted', {type: 'boolean', default: false});

	// TODO: Fix duplicate row insertion on update
	Model.observe('before save', async (ctx, next) => {
		console.log('saaaave', ctx.isNewInstance);
		if (ctx.isNewInstance) return next();

		let currentState = ctx.currentInstance ? ctx.currentInstance : ctx.data;
		if ((currentState.deleted && !!ctx.data.deleted)) return next(createCancellationToken(404,
			`Request with identifier ${ctx.where.id} was not found or is marked as deleted.`));
		let oldState = await ctx.Model.findOne({where: {id: currentState.id}});
		if (ctx.data.deleted || (currentState.deleted && !ctx.data.deleted)) return next();

		oldState.unsetAttribute('id');
		ctx.data.versionNumber = oldState.versionNumber + 1;
		console.log(ctx.currentInstance, ctx.data);
		await ctx.Model.create(oldState);
	});

	Model.observe('before delete', async (ctx, next) => {
		try {
			const result = await ctx.Model.findOne({where: {id: ctx.where.id}});
			if (result === null) {
				next(createCancellationToken(404, `Request with identifier ${ctx.where.id} was not found.`));
			} else {
				try {
					await result.updateAttribute('deleted', true);
					next(createCancellationToken(200, 'Marked version as deleted successfully'));
				} catch (err) {
					next(createCancellationToken(500, err));
				}
			}
		} catch (err) {
			next(createCancellationToken(500, err));
		}
	});
};
