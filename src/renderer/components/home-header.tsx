import React from 'react';
import NewProjectHandler from './new-project';

const HomeHeader = () => {
  return (
    <>
      <section className="p-4 flex flex-col">
        <div className="mb-2">
          <h1 className="text-2xl font-black tracking-wide text-indigo-500">
            c2gin
          </h1>
          <p className="tracking-wide font-light mt-1">
            a personal <strong>project</strong> management
          </p>
        </div>
        <NewProjectHandler />
      </section>
    </>
  );
};

export default HomeHeader;
