import React from "react";
import priceImg from "./priceImg";
import location from "./resources/svg/location.svg";
import bed from "./resources/svg/bed.svg";
import dollar from "./resources/svg/dollar.svg";
import dollarGrey from "./resources/svg/dollar-grey.svg";

export default function HotelInfo(props) {
  return (
    <div className="cont">
      <div className="card-container">
        <div className="image-card-container">
          <img width="100%" height="100%" src={props.photo} alt={props.slug} />
        </div>
        <div className="info-card">
          <h1 className="name-hotel">{props.name}</h1>

          <div className="details-hotel">
            <img className="icon" src={location} alt="location" />
            <p>
              {props.city}, {props.country}
            </p>
            <img className="icon margin-left" src={bed} alt="bed" />
            <p>{props.rooms} Habitaciones</p>
            <div className="price-hotel">
              {priceImg(props.price, dollar)}
              {priceImg(4 - props.price, dollarGrey)}
            </div>
          </div>
          <p className="description-hotel">{props.description}</p>
          <button className="button-card">Reservar</button>
        </div>
        {/* <div className="caja">
          <div className="details-hotel">
            <img className="icon" src={location} alt="location" />
            <p>
              {props.city}, {props.country}
            </p>
          </div>
          <div className="details-hotel">
            <img className="icon" src={bed} alt="bed" />
            <p>{props.rooms} Habitaciones</p>
            <div className="price-hotel">
              {priceImg(props.price, dollar)}
              {priceImg(4 - props.price, dollarGrey)}
            </div>
          </div>
          <button className="button-card">Reservar</button>
        </div> */}
      </div>
    </div>
  );
}
