import React from 'react';

import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import Sidebar from '../components/sidebar';

const wrapper = shallow(<Sidebar open setOpen={() => {}} />);

describe('Sidebar', () => {
  it('should render the sidebar', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should show/hide sidebar', () => {
    const sidebar = wrapper.find('#sidebar');
    const button = wrapper.find('#toggle-sidebar');

    button.simulate('click');

    expect(sidebar.hasClass('w-1/3 lg:w-1/4')).toBe(true);
    expect(sidebar.hasClass('w-1/12')).toBe(false);
  });
});
