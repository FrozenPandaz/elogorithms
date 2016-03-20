import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from 'angular2/router';
import {Home} from './Home/home.component';
import {Create} from './Create/create.component';


@Component({
	selector: 'app',
	directives: [ROUTER_DIRECTIVES],
	providers: [ROUTER_PROVIDERS],
	templateUrl: './dist/app/app.component.html'
})

@RouteConfig([
	{
		path: '/',
		name: 'Home',
		component: Home
	}, {
		path: '/create',
		name: 'Create',
		component: Create
	}
])

export class App {
	constructor() {}

	title: string = 'ELOgorithms';
}