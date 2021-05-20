import { useContext } from 'react';
import { WorkProviderContext } from '../c2gin/work-provider';

// THIS WILL BE RE-WRITTING FOR USING A PROVIDER
export default function useWorkGroup() {
  const context = useContext(WorkProviderContext);
  if (!context) {
    throw new Error('work provider err!');
  }

  return context;
}
