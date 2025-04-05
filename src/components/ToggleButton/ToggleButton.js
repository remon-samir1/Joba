import React, { useState } from 'react';

const ToggleButton = (props) => {
  const [isOn, setIsOn] = useState(true); 

  const handleToggle = () => {
    setIsOn(prev => !prev);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div
        onClick={handleToggle}
        style={{
          width: '55px',
          height: '27px',
          borderRadius: '30px',
          backgroundColor: isOn ? '#319f43' : '#dddddd',
          position: 'relative',
          cursor: 'pointer',
          transition: '0.3s',
          border: isOn ? '0.5px solid #0E8A29' :'0.5px solid #999999'
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'absolute',
            top: '2.5px',
            left: isOn ? '30px' : '3px',
            transition: '0.3s'
          }}
        />
      </div>
      <span>{props.title}</span>
    </div>
  );
};

export default ToggleButton;
