import angular from 'angular';
import 'angular-ui-router';

import homeComponent from './home.component';
import filterService from '../services/filter.service';

import './home.scss';


const module = angular.module('home.module', ['ui.router'])
	.component('home', homeComponent)
	.service('FilterService', filterService)
	.config(($stateProvider) => {
		"ngInject";
		$stateProvider
			.state('home', {
				url: '/home',
				template: '<home></home>'
			});
	})
	.name;

export default module;