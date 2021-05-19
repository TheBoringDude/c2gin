import React, { useCallback, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';

import HomeHeader from './home-header';
import NewProjectHandler from './new-project';

import db, { ProjectPropsSchema } from '../c2gin/lowdb';

const SideBar = () => {
  const [projects, setProjects] = useState<ProjectPropsSchema[]>([]);
  const [updated, setUpdated] = useState(false);

  const inputProjectRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProjects(db.get('projects').value());
  }, [updated]);

  const HandleCreateProject = useCallback(() => {
    const projectName = inputProjectRef.current?.value || '';

    if (!projectName) return;

    db.get('projects')
      .push({ id: nanoid(12), name: projectName, works: [] })
      .write();

    setUpdated(true);
  }, []);

  return (
    <div className="w-1/4 border-r">
      <section className="p-4 flex flex-col">
        <HomeHeader />

        <NewProjectHandler
          HandleCreateProject={HandleCreateProject}
          inputProjectRef={inputProjectRef}
        />
      </section>

      <hr />

      <ul className="py-3 h-screen overflow-y-auto">
        {projects.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              className="p-3 border-b text-left w-full hover:bg-purple-200"
            >
              {project.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
