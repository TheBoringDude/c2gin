import React, { ReactNode, useState } from 'react';
import SideBar from '../sidebar';

type ContainerProps = {
  children: ReactNode;
};

const ContainerWrapper = ({ children }: ContainerProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex items-start justify-between">
      <SideBar open={open} setOpen={setOpen} />

      <div
        className={`${
          open ? 'w-2/3 lg:w-3/4' : 'w-11/12'
        } ml-auto h-screen p-4`}
      >
        {children}
      </div>
    </div>
  );
};

export default ContainerWrapper;
