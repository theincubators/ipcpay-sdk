import { useState } from 'react';

import DownloadFendermint from '../components/download-fendermint';
import Active from '../components/steps/active';
import Todo from '../components/steps/todo';
import Last from '../components/steps/last';

const Test = () => {
  return (
    <div className="flex min-w-full border-2 border-solid border-gray-400 p-8">
      <div className="flex-shrink-0">
        <h2 className="text-xl font-bold p-8 pl-0">IPC Trampoline</h2>
        <nav aria-label="Progress">
          <ol role="list" className="overflow-hidden">
            <Active title="Download Stack" />
            <Todo title="Select Parent Network" />
            <Todo title="Generate Validators" />
            <Todo title="Create subnet" />
            <Last title="Join the subnet" />
          </ol>
        </nav>
      </div>

      <div className="flex-grow justify-center items-center">
        <DownloadFendermint />
      </div>
    </div>
  );
};

export default Test;
