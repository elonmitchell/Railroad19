import angular from 'angular';

import 'angular-ui-router';
import 'angular-animate';
import 'angular-sanitize';
import 'angular-ui-bootstrap';
import 'bootstrap-ui-datetime-picker';
import 'angularjs-toast/angularjs-toast.min.js';

import Components from './components';
import Home from './home';

import appComponent from './application.component';

import './app.scss';

angular
  .module('testboard', ['ui.router', 'ngSanitize', 'ngAnimate', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'angularjsToast', Components, Home])
  .config(($locationProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true);
  })
  .config(($urlRouterProvider) => {
    "ngInject";
    $urlRouterProvider.otherwise('/home');
  })
  .run(($rootScope, $http) => {
    "ngInject";
    $rootScope.dateFormat = 'MM/dd/yyyy';

    $http.get('./assets/projects.json')
      .then(result => {
        $rootScope.allProjects = result.data;
      });
  })
  .component('app', appComponent);

angular
  .element(document)
  .ready(() => angular.bootstrap(document, ['testboard']));

