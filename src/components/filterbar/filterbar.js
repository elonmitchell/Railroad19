import moment from "moment";

import './filterbar.scss';

class FilterBarController {

  constructor() {
    this.selectedDivision = '';
    this.divisions = [{
      value: '',
      label: 'Select a Division'
    }, {
      value: 'Accounting',
      label: 'Accounting'
    }, {
      value: 'Administration',
      label: 'Administration'
    }, {
      value: 'Marketing',
      label: 'Marketing'
    }, {
      value: 'Sales',
      label: 'Sales'
    }, {
      value: 'Production',
      label: 'Production'
    }];
    this.selectedStatus = '';
    this.projectStates = [{
      value: '',
      label: 'Select a Status'
    }, {
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
    this.projectOwner = '';
    this.createdDateFrom = null;
    this.createdDateTo = null;
    this.modifiedDateFrom = null;
    this.modifiedDateTo = null;
    this.popupCreatedDateFrom = {
      opened: false
    };
    this.popupCreatedDateTo = {
      opened: false
    };
    this.popupModifiedDateFrom = {
      opened: false
    };
    this.popupModifiedDateTo = {
      opened: false
    };
    this.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 1, 1),
      minDate: new Date(2000, 1, 1),
      startingDay: 1,
      showWeeks: false,
      buttonBar: {
        show: true,
        now: {
            show: true,
            text: 'Now'
        },
        today: {
            show: true,
            text: 'Today'
        },
        clear: {
            show: true,
            text: 'Clear'
        },
        date: {
            show: true,
            text: 'Date'
        },
        time: {
            show: true,
            text: 'Time'
        },
        close: {
            show: true,
            text: 'Close'
        }
      }
    };
  }

  $onInit() {
    this.clearFilter();
  }

  toggleCreatedDateFromPicker() {
    this.popupCreatedDateFrom.opened = !this.popupCreatedDateFrom.opened;
  }

  toggleCreatedDateToPicker() {
    this.popupCreatedDateTo.opened = !this.popupCreatedDateTo.opened;
  }

  toggleModifiedDateFromPicker() {
    this.popupModifiedDateFrom.opened = !this.popupModifiedDateFrom.opened;
  }

  toggleModifiedDateToPicker() {
    this.popupModifiedDateTo.opened = !this.popupModifiedDateTo.opened;
  }

  applyFilter() {
    const filter = {
      title: this.title,
      division: this.selectedDivision,
      project_owner: this.projectOwner,
      budget_from: this.budgetFrom,
      budget_to: this.budgetTo,
      status: this.selectedStatus,
      created_from: this.createdDateFrom ? moment(this.createdDateFrom).format('MM-DD-YYYY') : null,
      created_to: this.createdDateTo ? moment(this.createdDateTo).format('MM-DD-YYYY') : null,
      modified_from: this.modifiedDateFrom ? moment(this.modifiedDateFrom).format('MM-DD-YYYY') : null,
      modified_to: this.modifiedDateTo ? moment(this.modifiedDateTo).format('MM-DD-YYYY') : null
    };
    this.update(filter);
  }

  clearFilter() {
    this.title = '';
    this.selectedDivision = '';
    this.projectOwner = '';
    this.budgetFrom = null;
    this.budgetTo = null;
    this.selectedStatus = '';
    this.createdDateFrom = null;
    this.createdDateTo = null;
    this.modifiedDateFrom = null;
    this.modifiedDateTo = null;
    this.applyFilter();
  }
}

const FilterBar = {
  bindings: {
    update: '<'
  },
  template: require('./filterbar.html'),
  controllerAs: 'filterVM',
  controller: FilterBarController
};

export default FilterBar;
