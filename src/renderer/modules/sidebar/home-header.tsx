import React from 'react';
import icon from '../../../../assets/icon.svg';
import useSideBar from '../../hooks/useSideBar';

const HomeHeader = () => {
  const { sideOpen } = useSideBar();

  return (
    <div className="inline-flex items-center">
      <img src={icon} alt="c2gin" className={`h-6 w-6 ${sideOpen && 'mr-1'}`} />
      {sideOpen && (
        <h1 className="text-xl font-black tracking-wider text-indigo-500 dark:text-indigo-400 truncate dark:bg-gray-800 rounded-lg">
          c2gin
        </h1>
      )}
    </div>
  );
};

export default HomeHeader;
