import React from 'react';
import manageImg from '../images/manager.svg';
import todosImg from '../images/todo.svg';

export default function WelcomeMessage() {
  return (
    <div className="p-8 text-center">
      <div className="w-5/6 mx-auto">
        <h3 className="text-4xl font-bold text-gray-600">Welcome back!</h3>

        <div className="my-12">
          <div className="p-6 border rounded-lg my-4">
            <img
              src={manageImg}
              alt="c2gin - Manage Projects"
              className="h-56 md:h-64 mx-auto"
            />
            <p className="text-xl text-gray-600 py-4">
              Manage the things needed to do in your project
            </p>
          </div>
          <div className="p-6 border rounded-lg my-4">
            <img
              src={todosImg}
              alt="c2gin - Manage Projects"
              className="h-56 md:h-64 mx-auto"
            />
            <p className="text-xl text-gray-600 py-4">
              Organize your workflow, do what needs to be done
            </p>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between">
          <a
            className="text-gray-600 hover:text-indigo-600 hover:underline"
            href="https://github.com/TheBoringDude/c2gin"
            title="Goto Github Repo"
          >
            Github
          </a>
          <a
            className="text-gray-600 hover:text-indigo-600 hover:underline"
            href="https://github.com/TheBoringDude"
            title="Author"
          >
            @TheBoringDude
          </a>
        </div>
      </div>
    </div>
  );
}
