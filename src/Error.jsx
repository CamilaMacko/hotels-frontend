import React from "react";

export default function HotelInfo(props) {
  return (
    <div className={props.className}>
      <p>{props.text}</p>
    </div>
  );
}
