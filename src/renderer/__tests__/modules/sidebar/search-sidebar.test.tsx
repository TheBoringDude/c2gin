import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import SideBarProjectsSearch from '../../../modules/sidebar/search-sidebar';

describe('Sidebar search', () => {
  it('should render', () => {
    expect(
      render(<SideBarProjectsSearch setListProjects={() => {}} />)
    ).toBeTruthy();
  });
});
