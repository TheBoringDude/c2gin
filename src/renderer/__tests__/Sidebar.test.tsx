import React from 'react';

import '@testing-library/jest-dom';
import { shallow } from 'enzyme';

import Sidebar from '../components/sidebar';

const container = shallow(<Sidebar open setOpen={() => {}} />);

describe('Sidebar', () => {
  it('should render the sidebar', () => {
    expect(container).toBeTruthy();
  });
});
