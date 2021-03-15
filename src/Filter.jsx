import React from "react";

export default function Filter(props) {
  const dataList = props.infoOption;
  const elementList = dataList.map((data, index) => (
    <option key={index} value={data.value}>
      {data.text}
    </option>
  ));

  return (
    <div key={props.id}>
      <select
        className="filter-select"
        onChange={props.change}
        value={props.value}
      >
        {elementList}
      </select>
    </div>
  );
}
