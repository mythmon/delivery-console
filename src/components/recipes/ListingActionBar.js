import { Button, Col, Input, Row } from 'antd';
import autobind from 'autobind-decorator';
import { push } from 'connected-react-router';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckboxMenu from 'console/components/common/CheckboxMenu';
import { saveRecipeListingColumns } from 'console/state/recipes/actions';
import { getRecipeListingColumns } from 'console/state/recipes/selectors';
import {
  getCurrentUrl as getCurrentUrlSelector,
  getQueryParam,
} from 'console/state/router/selectors';
import { reverse } from 'console/urls';

@connect(
  (state, props) => ({
    columns: getRecipeListingColumns(state),
    getCurrentUrl: queryParams => getCurrentUrlSelector(state, queryParams),
    searchText: getQueryParam(state, 'searchText'),
  }),
  {
    push,
    saveRecipeListingColumns,
  },
)
@autobind
export default class ListingActionBar extends React.PureComponent {
  static propTypes = {
    columns: PropTypes.instanceOf(List).isRequired,
    getCurrentUrl: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    saveRecipeListingColumns: PropTypes.func.isRequired,
    searchText: PropTypes.string,
  };

  static defaultProps = {
    searchText: null,
  };

  handleChangeSearch(value) {
    const { getCurrentUrl } = this.props;
    this.props.push(getCurrentUrl({ searchText: value || undefined }));
  }

  render() {
    const { columns, searchText } = this.props;
    return (
      <Row gutter={16} className="list-action-bar">
        <Col span={14}>
          <Input.Search
            className="search"
            placeholder="Search..."
            defaultValue={searchText}
            onSearch={this.handleChangeSearch}
          />
        </Col>
        <Col span={2}>
          <CheckboxMenu
            checkboxes={columns.toJS()}
            label="Columns"
            onChange={this.props.saveRecipeListingColumns}
            options={[
              { label: 'Name', value: 'name' },
              { label: 'Action', value: 'action' },
              { label: 'Enabled', value: 'enabled' },
              { label: 'Last Updated', value: 'lastUpdated' },
              { label: 'Enrollment Active', value: 'paused' },
            ]}
          />
        </Col>
        <Col span={8} className="righted">
          <Link to={reverse('recipes.new')} id="lab-recipe-link">
            <Button type="primary" icon="plus" id="lab-recipe-button">
              New Recipe
            </Button>
          </Link>
        </Col>
      </Row>
    );
  }
}
