import moment from 'moment';

// default value
const filters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

// populated data filters
const altFilters = {
  text: 'bills',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days')
};

export { filters, altFilters };
