import Link from 'next/link';

const DownloadFendermint = ({ title, text }) => {
  return (
    <div className="p-8 container mx-auto p-4 max-w-7xl sm:px-6 lg:px-8">
      <p className="pt-8">
        <span className="text-sm font-medium  ">
          The first step downloads the IPC Fendermint stack to the machine where
          you've installed the IPC Trampoline.
        </span>
      </p>
      <p className="pt-4">
        <span className="text-sm font-medium  ">
          It will be downloaded to ~/ipc-trampoline-workspace.
        </span>
      </p>
      <p className="pt-8">
        <Link
          href="/step2"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Next &gt;
        </Link>
      </p>
    </div>
  );
};

export default DownloadFendermint;
