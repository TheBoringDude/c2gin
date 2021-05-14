import React from 'react';
import HomeHeader from './home-header';

const SideBar = () => {
  return (
    <div className="w-1/4 border-r h-screen overflow-y-auto">
      <HomeHeader />

      <hr />
    </div>
  );
};

export default SideBar;
