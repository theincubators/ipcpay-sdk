import { useState } from 'react';

import Active from '../components/steps/active';
import Done from '../components/steps/done';
import Todo from '../components/steps/todo';
import Last from '../components/steps/last';

import GenerateValidators from '../components/generate-validators';

const Test = () => {
  return (
    <div className="flex min-w-full border-2 border-solid border-gray-400 p-8">
      <div className="flex-shrink-0">
        <h2 className="text-xl font-bold p-8 pl-0">IPC Trampoline</h2>
        <nav aria-label="Progress">
          <ol role="list" className="overflow-hidden">
            <Done title="Download Stack" />
            <Done title="Select Parent Network" />
            <Active title="Generate Validators" />
            <Todo title="Create subnet" />
            <Last title="Join the subnet" />
          </ol>
        </nav>
      </div>

      <div className="flex-grow justify-center items-center">
        <GenerateValidators />
      </div>
    </div>
  );
};

export default Test;
