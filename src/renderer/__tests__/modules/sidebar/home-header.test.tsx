import '@testing-library/jest-dom';
import { render } from 'enzyme';
import React from 'react';
import HomeHeader from '../../../modules/sidebar/home-header';

const wrapper = render(<HomeHeader />);

describe('Home Header', () => {
  it('should contain logo / name', () => {
    const name = wrapper.find('h1').text();

    expect(name).toBe('c2gin');
  });
});
