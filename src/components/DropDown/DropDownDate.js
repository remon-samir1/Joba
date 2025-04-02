import React, { useState } from 'react';

export const DateSelectBox = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className='DateSelectBox'>
      <select value={selectedOption} onChange={handleChange}>
        <option value="option1"> Year</option>
        <option value="option2">Month</option>
        <option value="option3"> Weekly</option>
      </select>
    </div>
  );
};

// export default MySelectBox;
