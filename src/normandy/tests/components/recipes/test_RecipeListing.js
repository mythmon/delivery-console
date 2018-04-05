import { List } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';

import TestComponent from 'normandy/components/recipes/RecipeListing';

const { WrappedComponent: RecipeListing } = TestComponent;

describe('<RecipeListing>', () => {
  const props = {
    columns: new List(),
    count: null,
    fetchFilteredRecipesPage: () => {},
    getCurrentURL: () => {},
    ordering: null,
    pageNumber: null,
    push: () => {},
    newWindow: () => {},
    recipes: new List(),
    searchText: null,
    status: null,
  };

  test('should work', () => {
    const wrapper = () => shallow(<RecipeListing {...props} />);

    expect(wrapper).not.toThrow();
  });
});
