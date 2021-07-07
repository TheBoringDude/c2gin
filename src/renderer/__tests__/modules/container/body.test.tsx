import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';
import { C2GinContext } from '../../../c2gin/provider';
import ContainerBody from '../../../modules/container/body';

describe('Container body', () => {
  it('should render', () => {
    expect(
      render(
        <C2GinContext.Provider
          value={{
            selected: {
              id: '11rW45XjFLpb',
              name: 'phurma',
              createdDate: '2021-06-05T00:51:26.612Z',

              works: {
                FALR2xkJCgq6: {
                  id: 'FALR2xkJCgq6',
                  color: {
                    key: 'default',
                    bg: 'bg-white text-black',
                    border: '',
                  },
                  title: 'sample',
                  description: '',
                  list: [],
                },
              },
            },
            setSelected: () => {},
            projects: [],
            setProjects: () => {},
            handleReRead: () => {},
            tags: [],
            dispatchTags: () => {},
            modified: false,
            setModified: () => {},
          }}
        >
          <ContainerBody />
        </C2GinContext.Provider>
      )
    ).toBeTruthy();
  });
});
