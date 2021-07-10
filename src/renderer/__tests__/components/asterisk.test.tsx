import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { WorkProviderContext } from '../../c2gin/group-provider';
import { C2GinContext } from '../../c2gin/provider';
import ProjectAsterisk from '../../components/asterisk';

describe('Asterisk component', () => {
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
              color: 'default',
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
      <WorkProviderContext.Provider
        value={{
          updated: true,
          setUpdated: () => {},
          state: {
            FALR2xkJCgq6: {
              id: 'FALR2xkJCgq6',
              color: 'default',
              title: 'sample--changed',
              description: '',
              list: [],
            },
          },
          dispatch: () => {},
        }}
      >
        <ProjectAsterisk projectid="11rW45XjFLpb" />
      </WorkProviderContext.Provider>
    </C2GinContext.Provider>
  );

  it('should should show asterisk', () => {
    expect(screen.getByText('*')).toBeTruthy();
  });
});
