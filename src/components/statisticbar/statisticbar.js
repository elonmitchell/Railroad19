import _ from 'lodash';
import PerfectScrollbar from 'perfect-scrollbar';
import './statisticbar.scss';

class StatisticBarController {

  constructor() {
		this.ps = new PerfectScrollbar('#statistic_body', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }

  $onChanges() {
    this.getSummation();
  }

  getSummation() {
    if (this.records && Array.isArray(this.records)) {
      let totalProjects = 0;
      let totalAdminstrations = 0;
      let totalAccountings = 0;
      let totalProductions = 0;
      let totalMarketings = 0;
      let totalSales = 0;
      let totalBudgets = 0;
      let totalNewProjects = 0;
      let totalWorkingProjects = 0;
      let totalDeliveredProjects = 0;
      let totalArchivedProjects = 0;
      this.records.forEach(record => {
        totalProjects = totalProjects + 1;
        totalBudgets = totalBudgets + record.budget;
        if (record.division === 'Administration') {
          totalAdminstrations = totalAdminstrations + 1;
        } else if (record.division === 'Accounting') {
          totalAccountings = totalAccountings + 1;
        } else if (record.division === 'Production') {
          totalProductions = totalProductions + 1;
        } else if (record.division === 'Marketing') {
          totalMarketings = totalMarketings + 1;
        } else if (record.division === 'Sales') {
          totalSales = totalSales + 1;
        }
        if (record.status === 'new') {
          totalNewProjects = totalNewProjects + 1;
        } else if (record.status === 'working') {
          totalWorkingProjects = totalWorkingProjects + 1;
        } else if (record.status === 'delivered') {
          totalDeliveredProjects = totalDeliveredProjects + 1;
        } else if (record.status === 'archived') {
          totalArchivedProjects = totalArchivedProjects + 1;
        }
      });
      this.summation = {
        totalProjects,
        totalAdminstrations,
        totalAccountings,
        totalProductions,
        totalMarketings,
        totalSales,
        totalOwners: this.getTotalOwners(),
        highestBudgeted: this.getHighestBudgetedTitle(),
        lowestBudgeted: this.getLowestBudgetedTitle(),
        totalBudgets,
        totalNewProjects,
        totalWorkingProjects,
        totalDeliveredProjects,
        totalArchivedProjects,
        newestProject: this.getNewestProjectTitle(),
        oldestProject: this.getOldestProjectTitle(),
        lastModifiedProject: this.getLastModifiedProjectTitle()
      };
    }
  }

  getTotalOwners() {
    if (this.records && Array.isArray(this.records)) {
      const data = _.uniqBy(this.records, 'project_owner');
      return data ? data.length : '';
    } else {
      return '';
    }
  }

  getHighestBudgetedTitle() {
    if (this.records && Array.isArray(this.records)) {
      const data = _.maxBy(this.records, (record) => record.budget);
      return data ? data.title : '';
    } else {
      return '';
    }
  }
  getLowestBudgetedTitle() {
    if (this.records && Array.isArray(this.records)) {
      const data = _.minBy(this.records, (record) => record.budget);
      return data ? data.title : '';
    } else {
      return '';
    }
  }
  getNewestProjectTitle() {
    if (this.records && Array.isArray(this.records)) {
      const data = _.maxBy(this.records, (record) => Date.parse(record.created));
      return data ? data.title : '';
    } else {
      return '';
    }
  }
  getOldestProjectTitle() {
    if (this.records && Array.isArray(this.records)) {
      const data = _.minBy(this.records, (record) => Date.parse(record.created));
      return data ? data.title : '';
    } else {
      return '';
    }
  }
  getLastModifiedProjectTitle() {
    if (this.records && Array.isArray(this.records)) {
      const data = _.maxBy(this.records, (record) => Date.parse(record.modified));
      return data ? data.title : '';
    } else {
      return '';
    }
  }

}

const StatisticBar = {
  bindings: {
    records: '<'
  },
  template: require('./statisticbar.html'),
  controllerAs: 'statisticVM',
  controller: StatisticBarController
};

export default StatisticBar;
