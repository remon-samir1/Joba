import React, { useState } from 'react';

export const SelectBox = (props) => {


  return (
    <div className='DateSelectBox'>
      <select onChange={props.onChange} className={`outline-none ${props.className}`} required={props.value && props.required} value={ props.value} disabled={props.disabled} >
      {props.title &&  <option selected value=''>{props.title}</option>}
      {[props.data?.map((data , index)=>(
        <option value={data.value}> {data.name}</option>

      ))]}
  
      </select>
    </div>
  );
};


