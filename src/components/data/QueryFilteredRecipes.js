import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { fetchFilteredRecipesPage } from 'console/state/recipes/actions';

@connect(
  null,
  {
    fetchFilteredRecipesPage,
  },
)
export default class QueryFilteredRecipes extends React.PureComponent {
  static propTypes = {
    fetchFilteredRecipesPage: PropTypes.func,
    filters: PropTypes.object,
    pageNumber: PropTypes.number,
  };

  static defaultProps = {
    fetchFilteredRecipesPage: null,
    filters: {},
    pageNumber: 1,
  };

  componentWillMount() {
    const { filters, pageNumber } = this.props;
    this.props.fetchFilteredRecipesPage(pageNumber, filters);
  }

  componentWillReceiveProps(nextProps) {
    const { filters, pageNumber } = this.props;
    if (pageNumber !== nextProps.pageNumber || !isEqual(filters, nextProps.filters)) {
      this.props.fetchFilteredRecipesPage(nextProps.pageNumber, nextProps.filters);
    }
  }

  render() {
    return null;
  }
}
