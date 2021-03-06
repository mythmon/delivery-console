import { List, Map } from 'immutable';
import OptOutStudyFields from 'console/components/recipes/OptOutStudyFields';

describe('<OptOutStudyFields>', () => {
  const props = {
    disabled: false,
    extensions: new List(),
    recipeArguments: new Map(),
  };

  it('should work', () => {
    const wrapper = () => shallow(<OptOutStudyFields {...props} />);

    expect(wrapper).not.toThrow();
  });
});
