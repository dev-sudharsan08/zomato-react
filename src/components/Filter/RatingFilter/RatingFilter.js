import React from 'react';

const RatingFilter = () => {
  return (
    <>
      <p className='text-secondary mb-1'>Rating</p>
      <h5>Any</h5>
      {/* <label htmlFor='customRange3' className='form-label'>
        Example range
      </label> */}
      <input
        type='range'
        className='form-range'
        min='3'
        max='5'
        step='0.5'
        id='customRange3'
        style={{ width: 300 }}
      />
    </>
  );
};

export default RatingFilter;
