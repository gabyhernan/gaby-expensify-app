// file that runs that allow us to configure our test environment
// where we set up the enzyme adapter

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// takes all sorts of attributes
Enzyme.configure({
  adapter: new Adapter()
})

// now when we use enzyme in our test cases
