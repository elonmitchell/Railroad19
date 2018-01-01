import moment from 'moment';

class FilterService {

  constructor($http, $q, $rootScope) {
    "ngInject";

    this.$http = $http;
    this.$q = $q;
    this.$root = $rootScope;
  }

  getRecords(filter = null) {
    let result;
    if (!filter) {
      result = this.$root.allProjects;
    } else if (this.$root.allProjects && Array.isArray(this.$root.allProjects)) {
      result = this.$root.allProjects.filter((record) => {
        return  (!filter.title || record.title.toLowerCase().indexOf(filter.title.toLowerCase()) > -1) &&
                (!filter.division || record.division === filter.division) &&
                (!filter.project_owner || record.project_owner.toLowerCase().indexOf(filter.project_owner.toLowerCase()) > -1) &&
                (filter.budget_from === null || record.budget >= filter.budget_from ) &&
                (filter.budget_to === null || record.budget <= filter.budget_to ) &&
                (!filter.status || record.status === filter.status ) && 
                (!filter.created_from || moment(record.created).diff(filter.created_from) >= 0) && 
                (!filter.created_to || moment(record.created).diff(filter.created_to) <= 0) &&
                (!filter.modified_from || moment(record.modified).diff(filter.modified_from) >= 0) && 
                (!filter.modified_to || moment(record.modified).diff(filter.modified_to) <= 0);
      });
    } else {
      result = [];
    }
    return this.$q.resolve(result);
  }
}

export default FilterService;
