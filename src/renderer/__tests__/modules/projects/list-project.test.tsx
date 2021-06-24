import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import ListProject from '../../../modules/projects/list-project';

describe('list projects', () => {
  it('should render', () => {
    expect(
      render(
        <ListProject
          project={{
            id: 'random-id',
            name: 'project',
            createdDate: new Date().toISOString(),
            works: {},
          }}
          index={0}
        />
      )
    ).toBeTruthy();
  });
});
