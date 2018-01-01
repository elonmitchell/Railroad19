import PerfectScrollbar from 'perfect-scrollbar';

class HomeController {

  constructor($rootScope, FilterService, toast) {
    "ngInject";
    this.$root = $rootScope;
    this.filterService = FilterService;
    this.toast = toast;
    this.records = null;
    this.ps = new PerfectScrollbar('#records', {
      wheelSpeed: 1,
      wheelPropagation: false,
      minScrollbarLength: 20
    });
    this.projectStates = [{
      value: 'archived',
      label: 'Archived'
    }, {
      value: 'new',
      label: 'New'
    }, {
      value: 'working',
      label: 'Working'
    }, {
      value: 'delivered',
      label: 'Delivered'
    }];

    this.getRecords = (filter) => {
      this.filter = filter;
      if (this.filterService) {
        this.filterService.getRecords(filter)
          .then(records => this.records = records );
      }
    }
  }

  $onInit() {
    this.$root.$watch('allProjects', () => {
      this.getRecords(this.filter);
    }, true);
  }

  setEditing(row, col) {
    this.editing = { row, col }
  }

  cancelEditing() {
    this.editing = null;
  }

  isEditing(row, col) {
    if (this.editing && this.editing.row === row && this.editing.col === col) {
      return true;
    } else {
      return false;
    }
  }

  updateField(event, row, propertyName, value) {
    if (event && event.keyCode === 13) {
      if (this.$root.allProjects && this.$root.allProjects[row] && this.$root.allProjects[row][propertyName] !== value) {
        this.$root.allProjects[row][propertyName] = value;
        this.toast({
          duration: 2000,
          message: `Changes for Project ${this.$root.allProjects[row].title} successful`,
          className: 'custom-toast',
          maxToast: 1
        });
      }
      this.editing = null;
    } else if (propertyName === 'status') {
      if (this.$root.allProjects && this.$root.allProjects[row] && this.$root.allProjects[row][propertyName] !== value) {
        this.$root.allProjects[row][propertyName] = value;
        this.toast({
          duration: 2000,
          message: `Changes for Project ${this.$root.allProjects[row].title} successful`,
          className: 'custom-toast',
          maxToast: 1
        });
      }
      this.editing = null;
    }
  }
}

const homeComponent = {
  template: require('./home.html'),
  controllerAs: 'homeVM',
  controller: HomeController
};

export default homeComponent;
