import { useContext } from 'react';
import { UIContext } from '../c2gin/ui-provider';

const useMode = () => {
  const context = useContext(UIContext);

  if (context === undefined) {
    throw new Error('only usable if you wrap your component in ui provider');
  }

  return context;
};

export default useMode;
