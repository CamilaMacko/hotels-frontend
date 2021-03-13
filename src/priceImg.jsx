import React from "react";

export default function priceImg(price, img) {
  let imgArray = [];
  for (let i = 0; i < price; i++) {
    imgArray.push(<img key={i} className="price-icon" src={img} />);
  }
  return imgArray;
}
