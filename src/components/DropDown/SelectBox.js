import React, { useState } from 'react';

export const SelectBox = (props) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className='DateSelectBox'>
      <select value={selectedOption} onChange={handleChange} className='outline-none'>
      {props.title &&  <option selected disabled>{props.title}</option>}
      {[props.data?.map((data , index)=>(
        <option value={data.value}> {data.name}</option>

      ))]}
  
      </select>
    </div>
  );
};


