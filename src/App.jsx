import React, { useState } from "react";
import "./styles.css";
import { hotelsData } from "./resources/data";
import { countryFilter } from "./resources/countryFilter";
import { priceFilter } from "./resources/priceFilter";
import { bedroomFilter } from "./resources/bedroomFilter";
import { initialStates } from "./resources/initialStates";

import HotelInfo from "./HotelInfo";
import Filter from "./Filter";

export default function App() {
  const [dateFromINPUT, setDateFromINPUT] = useState(initialStates[0].value);
  const [dateFrom, setDateFrom] = useState();

  const getDateFrom = (e) => {
    let dateFrom = e.target.value;
    console.log(dateFrom);
    let dateFromAST = new Date(dateFrom);
    let dateFromUnix = dateFromAST.valueOf() + 86400000;
    setDateFromINPUT(dateFrom);
    console.log(dateFromUnix);
    setDateFrom(dateFromUnix);
  };
  const [dateToINPUT, setdateToINPUT] = useState(initialStates[0].value);
  const [dateTo, setdateTo] = useState();

  const getDateTo = (e) => {
    let dateTo = e.target.value;
    let dateToAST = new Date(dateTo);
    let dateToUnix = dateToAST.valueOf() + 86400000;
    setdateToINPUT(dateTo);

    console.log(dateToUnix);
    setdateTo(dateToUnix);
  };

  // FILTRO PAIS
  const [country, setCountry] = useState(initialStates[1].value);

  const changeCountry = (e) => {
    let chCountry = e.target.value;
    console.log(chCountry);

    setCountry(chCountry);
  };

  // FILTRO PRECIO
  const [price, setPrice] = useState(initialStates[2].value);

  const changePrice = (e) => {
    let chPrice = e.target.value;
    console.log(chPrice);

    setPrice(chPrice);
  };

  // FILTRO TAMAÑO
  const [bedroom, setBedroom] = useState(initialStates[3].value);

  const changeBedroom = (e) => {
    let chBedroom = e.target.value;
    console.log(chBedroom);

    setBedroom(chBedroom);
  };

  //LISTA CREADA CADA VEZ QUE SELECCIONO UN FILTRO
  const createList = () => {
    const newList = hotelsData
      .filter((hotel) => {
        if (country !== initialStates[1].value) {
          return hotel.country === country;
        }
        return hotel;
      })
      .filter((hotel) => {
        if (price !== initialStates[2].value) {
          return hotel.price === Number(price);
        }
        return hotel;
      })
      .filter((hotel) => {
        if (bedroom === bedroomFilter[1].value) {
          return hotel.rooms <= 10;
        }
        if (bedroom === bedroomFilter[2].value) {
          return hotel.rooms > 10 && hotel.rooms <= 20;
        }
        if (bedroom === bedroomFilter[3].value) {
          return hotel.rooms > 20;
        }
        return hotel;
      })
      .filter((hotel) => {
        let rangoDate = dateTo - dateFrom;
        if (rangoDate > 0) {
          console.log(hotel.availabilityFrom);
          return (
            dateFrom >= hotel.availabilityFrom && dateTo <= hotel.availabilityTo
          );
        }
        return hotel;
      });

    return newList;
  };

  let filteredList = createList();

  const deleteFilter = () => {
    setCountry(initialStates[1].value);
    setBedroom(initialStates[3].value);
    setPrice(initialStates[2].value);
    setDateFromINPUT(initialStates[0].value);
    setDateFrom(0);
    setdateToINPUT(initialStates[0].value);
    setdateTo(0);

    filteredList = createList();
    return filteredList;
  };

  return (
    <div className="App">
      <div>
        {dateFromINPUT !== initialStates[0].value ||
        dateToINPUT !== initialStates[0].value ? (
          <p>Resultado de busqueda:</p>
        ) : null}
        {dateFromINPUT !== initialStates[0].value ? (
          <p>de fecha {dateFromINPUT}</p>
        ) : null}
        {dateToINPUT !== initialStates[0].value ? (
          <p>hasta fecha {dateToINPUT}</p>
        ) : null}
        {country !== initialStates[1].value ? (
          <p>el pais seleccionado es {country}</p>
        ) : null}
        {bedroom !== initialStates[3].value ? (
          <p>el pais seleccionado es {bedroom}</p>
        ) : null}
        {price !== initialStates[2].value ? (
          <p>el pais seleccionado es {price}</p>
        ) : null}
      </div>

      <div>
        <input onChange={getDateFrom} value={dateFromINPUT} type="date" />
        <input onChange={getDateTo} value={dateToINPUT} type="date" />
        <Filter
          key="country"
          change={changeCountry}
          value={country}
          infoOption={countryFilter}
        />
        <Filter
          key="price"
          change={changePrice}
          value={price}
          infoOption={priceFilter}
        />
        <Filter
          key="bedroom"
          change={changeBedroom}
          value={bedroom}
          infoOption={bedroomFilter}
        />
        <button onClick={deleteFilter}>eliminar busqueda</button>
      </div>
      <div className="display-flex-wrap">
        {filteredList.length !== 0 ? (
          filteredList.map((hotel, index) => {
            return (
              <HotelInfo
                id={index}
                name={hotel.name}
                photo={hotel.photo}
                description={hotel.description}
                rooms={hotel.rooms}
                city={hotel.city}
                country={hotel.country}
                price={hotel.price}
              />
            );
          })
        ) : (
          <div>no hay hotel</div>
        )}
      </div>
    </div>
  );
}
