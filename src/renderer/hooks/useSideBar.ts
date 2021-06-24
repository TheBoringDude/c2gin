import { useContext } from 'react';
import { SideContext } from '../c2gin/side-provider';

const useSideBar = () => {
  const context = useContext(SideContext);

  if (context === undefined) {
    throw new Error('only usable if you wrap your component in side provider');
  }

  return context;
};

export default useSideBar;
