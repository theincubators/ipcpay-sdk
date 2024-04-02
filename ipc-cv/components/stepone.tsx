import { useState } from 'react';
const StepOne = () => {
  const [network, setNetwork] = useState('Calibrationnet');
  const [isMultiValidator, setIsMultiValidator] = useState(false);
  const [validatorCount, setValidatorCount] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add logic for key generation, address computation, and faucet interaction
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select the root network:
          </label>
          <select
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
          >
            <option value="Calibrationnet">Calibrationnet</option>
            <option value="Mycelium Calibration">Mycelium Calibration</option>
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isMultiValidator}
              onChange={(e) => setIsMultiValidator(e.target.checked)}
            />
            Multi-validator
          </label>
        </div>
        {isMultiValidator && (
          <div>
            <label>Number of Validators:</label>
            <input
              type="range"
              min="1"
              max="10"
              value={validatorCount}
              onChange={(e) => setValidatorCount(e.target.value)}
            />
          </div>
        )}
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

export default StepOne;
