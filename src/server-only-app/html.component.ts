import {Component} from 'angular2/core';
import {RouteConfig} from 'angular2/router';

// Require our Universal App
import {App} from '../app/app.component';
import {Home} from '../app/Home/home.component';
import {Create} from '../app/Create/create.component';

@Component({
	selector: 'server-only-app',
	template: `
	<footer>{{ seo }}</footer>
	`
})
export class ServerOnlyApp {
	seo = 'Angular 2 Universal - server only rendered component';
}

@Component({
	selector: 'html',
	directives: [
	App,
	ServerOnlyApp
	],
	providers: [

	],
	template: `
	<head>
	<title>{{ seo.title }}</title>
	<meta charset="UTF-8">
	<meta name="description" content="Angular 2 Universal">
	<meta name="keywords" content="Angular 2,Universal">
	<meta name="author" content="PatrickJS">

	<link rel="icon" href="data:;base64,iVBORw0KGgo=">

	<base [attr.href]="seo.baseUrl">
	</head>
	<body>

	<app>
	Loading...
	</app>

	<server-only-app>
	Loading...
	</server-only-app>

	<script async [attr.src]="scriptUrl"></script>
	</body>
	`
})
@RouteConfig([
	{ path: '/', component: Home, name: 'Home', useAsDefault: true },
	{ path: '/home', component: Home, name: 'Home' },
	{ path: '/create', component: Create, name: 'Create' },
	{ path: '/**', redirectTo: ['Home'] }
	])
export class Html {
	seo = {
		baseUrl: '/',
		src: '/dist/client/bundle.js',
		title: 'Angular 2 Universal Starter - this component replaces the title element'
	};
}
