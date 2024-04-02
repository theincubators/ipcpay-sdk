import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const SelectNetwork = () => {
  const [rootNetwork, setNetwork] = useState('Mycelium Calibration');
  const router = useRouter(); // useRouter hook for redirection

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const rpcUrls = {
      calibration: 'https://api.calibration.node.glif.io/rpc/v1',
      mycelium: 'https://api.mycelium.calibration.node.glif.io/',
    };

    // Store data in local storage
    localStorage.setItem('rootNetwork', JSON.stringify(rootNetwork));
    localStorage.setItem(
      'rootNetworkRPC',
      JSON.stringify(rpcUrls[rootNetwork])
    );

    // Redirect to another page
    router.push('/step3');
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white rounded px-8 pt-6 pb-8 mb-4"
      >
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select the root network:
          </label>
          <select
            className="border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            value={rootNetwork}
            onChange={(e) => setNetwork(e.target.value)}
          >
            <option value="mycelium">Mycelium Calibration</option>
            <option value="calibration">Calibrationnet</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SelectNetwork;
