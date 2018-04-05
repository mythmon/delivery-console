import { List } from 'immutable';
import React from 'react';
import { shallow } from 'enzyme';

import TestComponent from 'normandy/components/extensions/ExtensionListing';

const { WrappedComponent: ExtensionListing } = TestComponent;

describe('<ExtensionListing>', () => {
  const props = {
    columns: new List(),
    count: 10,
    extensions: new List(),
    getCurrentURL: () => {},
    ordering: null,
    pageNumber: 1,
    push: () => {},
  };

  test('should work', () => {
    const wrapper = () => shallow(<ExtensionListing {...props} />);

    expect(wrapper).not.toThrow();
  });
});
