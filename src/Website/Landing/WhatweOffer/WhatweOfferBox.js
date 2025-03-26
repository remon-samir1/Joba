import React, { forwardRef } from "react";

const WhatweOfferBox = forwardRef((props, ref) => {
  return (
    <div className="WhatweOfferBox" ref={ref}>
      <div className="img">
        <img
          src={require(`../../../images/${props.image}`)}
          alt="icon"
          loading="lazy"
        />
      </div>
      <h3>{props.header}</h3>
      <p>{props.desk}</p>
    </div>
  );
});

export default WhatweOfferBox;
