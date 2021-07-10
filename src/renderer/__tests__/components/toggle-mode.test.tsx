import { shallow } from 'enzyme';
import React from 'react';
import ToggleMode from '../../components/toggle-mode';

describe('Toggling should works', () => {
  const wrapper = shallow(<ToggleMode />);

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should toggle', () => {
    wrapper.find('button').simulate('click');

    expect(wrapper.find('button').prop('title')).toEqual('Toggle Dark Mode');
  });
});
