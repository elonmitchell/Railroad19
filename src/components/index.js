import angular from 'angular';

import NavBar from './navbar/navbar';
import FilterBar from './filterbar/filterbar';
import StatisticBar from './statisticbar/statisticbar';

const module = angular.module('components.module', [])
	.component('navbar', NavBar)
	.component('filterbar', FilterBar)
	.component('statisticbar', StatisticBar)
	.name;

export default module;