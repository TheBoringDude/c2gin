import '@testing-library/jest-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount } from 'enzyme';
import React from 'react';
import SideContextProvider from '../../../c2gin/side-provider';
import SideBar from '../../../modules/sidebar/sidebar';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = mount(
  <SideContextProvider>
    <SideBar />
  </SideContextProvider>
);

describe('Sidebar', () => {
  it('should render the sidebar', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should show/hide sidebar', () => {
    const sidebar = wrapper.find('#sidebar');
    const button = wrapper.find('#toggle-sidebar');

    button.simulate('click');

    expect(sidebar.hasClass('w-1/3 lg:w-1/4')).toBe(false);
    expect(sidebar.hasClass('w-1/12')).toBe(true);
  });
});
