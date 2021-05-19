import React, { ReactNode } from 'react';
import SideBar from './sidebar';

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="flex items-start justify-between">
      <SideBar />

      <div className="w-3/4 ml-auto h-screen overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default Container;
