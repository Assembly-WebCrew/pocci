import {Component} from 'angular2/core';
import {RouteConfig, RouteParams} from 'angular2/router';
import S from 'string';

@Component({
	selector: 'asm-frontpage',
	template: '<h1>{{ eventName }}</h1>'
})
export class FrontpageComponent {
	private eventSlug: string
	private eventName: string

	constructor(
		private _routeParams: RouteParams) {}

	ngOnInit() {
		this.eventSlug = this._routeParams.get('event');
		this.eventName = `ASSEMBLY ${S(this.eventSlug).capitalize()}`;
	}
}
