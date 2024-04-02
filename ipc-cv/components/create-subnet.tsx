import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import SubnetCreate from '../components/web3/subnet-create';

const CreateSubnet = () => {
  const [validatorCount, setValidatorCount] = useState(1);
  const [minValidatorStake] = useState(1);
  const [bottomUpCheckPeriod, setBottomUpCheckPeriod] = useState(30);
  const [isCreated, setIsCreated] = useState(false); // state to track button click
  const [showButton, setShowButton] = useState(false); // state to track button click

  const handleSubmit = async (event) => {
    console.log(validatorCount, minValidatorStake, bottomUpCheckPeriod);
    event.preventDefault();
    setIsCreated(true); // Set the state to true when form is submitted
    // Logic for handling form submission
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-white rounded px-8 pt-6 pb-8 mb-4"
        aria-labelledby="validator-form"
      >
        <div className="flex items-center">
          <span className="icon-validator-count mr-2" />{' '}
          {/* Icon for visual aid */}
          <label htmlFor="validatorCount">
            Number of Validators: {validatorCount}
          </label>
        </div>
        <input
          id="validatorCount"
          type="range"
          min="1"
          max="100"
          value={validatorCount}
          onChange={(e) => setValidatorCount(e.target.value)}
          className="range-slider"
        />
        <div className="flex items-center">
          <span className="icon-min-stake mr-2" /> {/* Icon for visual aid */}
          <label>Minimum Validator Stake: {minValidatorStake}</label>
        </div>
        <div> {/* Non-editable field for minimum stake */}</div>
        <div className="flex items-center">
          <span className="icon-bottom-up mr-2" /> {/* Icon for visual aid */}
          <label htmlFor="bottomUpCheckPeriod">
            Bottom Up Check Period (blocks):{' '}
          </label>
        </div>
        <input
          id="bottomUpCheckPeriod"
          type="number"
          value={bottomUpCheckPeriod}
          onChange={(e) => setBottomUpCheckPeriod(e.target.value)}
          className="number-input"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded button"
        >
          Create IPC Subnet
        </button>
      </form>
      <hr />
      {isCreated && ( // Conditional rendering based on isCreated
        <div>
          <SubnetCreate
            validatorCount={validatorCount}
            minValidatorStake={minValidatorStake}
            bottomUpCheckPeriod={bottomUpCheckPeriod}
            setShowButton={setShowButton}
          />
        </div>
      )}
      <p className="p-8">
        <Link
          href="/step5"
          className={`bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${
            !showButton ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!showButton} // Disable the link if showButton is false
        >
          Next &gt;
        </Link>
      </p>
    </div>
  );
};

export default CreateSubnet;
