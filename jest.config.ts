/* eslint-disable import/export */
import type { Config } from '@jest/types';

// Or async function
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testURL: 'http://localhost/',
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/.erb/mocks/fileMock.js',
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    moduleDirectories: ['node_modules', 'src/node_modules'],
    setupFiles: ['./.erb/scripts/CheckBuildsExist.js'],
    setupFilesAfterEnv: ['./.erb/mocks/matchMedia.mock.js'],
    modulePathIgnorePatterns: ['__mocks__'],
  };
};
