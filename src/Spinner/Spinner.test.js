import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Spinner from './Spinner';

Enzyme.configure({ adapter: new Adapter() });

describe('<Spinner />', () => {
  it('renders the spinner', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('div.loadingspinner')).to.have.length(1);
  });
});