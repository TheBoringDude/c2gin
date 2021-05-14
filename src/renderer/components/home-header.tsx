import React from 'react';
import NewProjectHandler from './new-project';

const HomeHeader = () => {
  return (
    <>
      <section className="my-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-wide text-indigo-500">
            c2gin
          </h1>
          <p className="text-xl tracking-wide font-light mt-1">
            A personal <strong>project</strong> management system.
          </p>
        </div>
        <NewProjectHandler />
      </section>
    </>
  );
};

export default HomeHeader;
