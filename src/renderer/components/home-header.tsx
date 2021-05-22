import React from 'react';

const HomeHeader = () => {
  return (
    <>
      <div className="mb-2">
        <h1 className="text-2xl font-black tracking-wide text-indigo-500">
          c2gin
        </h1>
        <p className="tracking-wide font-light mt-1">
          {/* TODO:
          the plan in here is to get a random quote like a quote of the day if the user is connected to the internet */}
          a personal <strong>project</strong> management
        </p>
      </div>
    </>
  );
};

export default HomeHeader;
