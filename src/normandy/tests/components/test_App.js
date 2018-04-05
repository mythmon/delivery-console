import React from 'react';
import { shallow } from 'enzyme';

import App from 'normandy/components/App';

describe('<App>', () => {
  const props = {
    children: <div>Hello</div>,
  };

  test('should work', () => {
    const wrapper = () => shallow(<App {...props} />);

    expect(wrapper).not.toThrow();
  });
});
