import { useContext } from 'react';
import { C2GinContext } from '../c2gin/provider';

const useCurrentProject = () => {
  const context = useContext(C2GinContext);

  if (!context) throw new Error('usable only inside C2GinProvider');

  return context;
};

export default useCurrentProject;
