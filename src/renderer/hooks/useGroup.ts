import { useContext } from 'react';
import { WorkProviderContext } from '../c2gin/group-provider';

// THIS WILL BE RE-WRITTING FOR USING A PROVIDER
export default function useGroup() {
  const context = useContext(WorkProviderContext);
  if (!context) {
    throw new Error('work provider err!');
  }

  return context;
}
