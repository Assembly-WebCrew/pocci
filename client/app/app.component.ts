import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FrontpageComponent} from './pages/frontpage.component';

@Component({
	selector: 'asm-app',
	template: '<router-outlet></router-outlet>',
	directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{ path: '/:event', name: 'Frontpage', component: FrontpageComponent },
])
export class AppComponent { }
