import Link from 'next/link';
import { useState } from 'react';
import KeyPairGenerator from '../components/web3/keypair-generator'; // Adjust the import path as necessary

const GenerateValidators = ({ title, text }) => {
  const [validatorCount, setValidatorCount] = useState(1);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [hasFunds, setHasFunds] = useState(false); // New state to track funds

  const handleSubmit = async (event) => {
    event.preventDefault();
    localStorage.setItem('validatorCount', JSON.stringify(validatorCount));
    setIsFormSubmitted(true);

    // Add logic for key generation, address computation, and faucet interaction
  };

  return (
    <>
      <div className="container mx-auto p-4 max-w-7xl sm:px-6 lg:px-8">
        <div>
          <form onSubmit={handleSubmit} aria-labelledby="validator-form">
            <div className="grid grid-cols-2 gap-4 bg-white rounded px-8 pt-6 pb-8 mb-4">
              <div className="flex items-center">
                <span className="icon-validator-count mr-2" />{' '}
                {/* Icon for visual aid */}
                <label htmlFor="validatorCount">
                  Number of Validators: {validatorCount}
                </label>
              </div>

              <input
                type="range"
                min="1"
                max="1"
                value={validatorCount}
                className="range-slider"
                onChange={(e) => setValidatorCount(e.target.value)}
              />
            </div>

            <div className="gap-4 bg-white rounded px-10 pt-6 pb-8 mb-4">
              <button
                type="submit"
                className="  bg-blue-500 hover:bg-blue-700 text-white p-2 rounded button"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
        <hr className="p-8" />
        {isFormSubmitted && (
          <KeyPairGenerator setHasFunds={setHasFunds} hasFunds={hasFunds} />
        )}
        <p className="p-8">
          <Link
            href="/step4"
            className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
              !hasFunds ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={(e) => {
              !hasFunds && e.preventDefault();
            }}
          >
            Next &gt;
          </Link>
        </p>
      </div>
    </>
  );
};

export default GenerateValidators;
