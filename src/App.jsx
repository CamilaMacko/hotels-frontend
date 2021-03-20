import React, { useState } from "react";
import "./styles.css";
import { hotelsData } from "./resources/data";
import { countryFilter } from "./resources/countryFilter";
import { priceFilter } from "./resources/priceFilter";
import { bedroomFilter } from "./resources/bedroomFilter";
import { initialStates } from "./resources/initialStates";
import { months } from "./resources/months";

import Header from "./Header";
import Filter from "./Filter";
import HotelInfo from "./HotelInfo";
import Error from "./Error";

export default function App() {
  const [deleteResult, setDeleteResult] = useState(false);
  const [dateFromINPUT, setDateFromINPUT] = useState(initialStates[0].value);
  const [dateFrom, setDateFrom] = useState();
  const [dateFromText, setDateFromText] = useState();

  const getDateFrom = (e) => {
    let dateFrom = e.target.value;
    let dateFromAST = new Date(dateFrom);
    let dateFromUnix = dateFromAST.valueOf() + 86400000;
    setDateFromINPUT(dateFrom);
    setDateFrom(dateFromUnix);
    let dateNum = dateFromAST.getDate() + 1;
    let monthNum = dateFromAST.getMonth();
    let monthText = months[monthNum];
    let year = dateFromAST.getFullYear();
    let dateText = `${dateNum} de ${monthText} del ${year}`;
    setDateFromText(dateText);
    setDeleteResult(true);
  };
  const [dateToINPUT, setdateToINPUT] = useState(initialStates[0].value);
  const [dateTo, setdateTo] = useState();
  const [dateToText, setdateToText] = useState();

  const getDateTo = (e) => {
    let dateTo = e.target.value;
    let dateToAST = new Date(dateTo);
    let dateToUnix = dateToAST.valueOf() + 86400000;
    setdateToINPUT(dateTo);
    setdateTo(dateToUnix);
    let dateNum = dateToAST.getDate() + 1;
    let monthNum = dateToAST.getMonth();
    let monthText = months[monthNum];
    let year = dateToAST.getFullYear();
    let dateText = `${dateNum} de ${monthText} del ${year}`;
    setdateToText(dateText);
    setDeleteResult(true);
  };

  // FILTRO PAIS
  const [country, setCountry] = useState(initialStates[1].value);

  const changeCountry = (e) => {
    let chCountry = e.target.value;
    setDeleteResult(true);
    setCountry(chCountry);
  };

  // FILTRO PRECIO
  const [price, setPrice] = useState(initialStates[2].value);

  const changePrice = (e) => {
    let chPrice = e.target.value;
    setDeleteResult(true);
    setPrice(chPrice);
  };

  // FILTRO TAMAÑO
  const [bedroom, setBedroom] = useState(initialStates[3].value);

  const changeBedroom = (e) => {
    let chBedroom = e.target.value;
    setDeleteResult(true);
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
          if (price === "muy económico") {
            return hotel.price === 1;
          }
          if (price === "económico") {
            return hotel.price === 2;
          }
          if (price === "caro") {
            return hotel.price === 3;
          }
          if (price === "muy caro") {
            return hotel.price === 4;
          }
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
    setDeleteResult(false);

    filteredList = createList();
    return filteredList;
  };

  return (
    <div className="App">
      <Header
        key="header"
        result={deleteResult}
        dateFrom={dateFromINPUT}
        dateFromText={dateFromText}
        dateTo={dateToINPUT}
        dateToText={dateToText}
        country={country}
        price={price}
        bedroom={bedroom}
      />

      <div className="filter-container display-flex">
        <input onChange={getDateFrom} value={dateFromINPUT} type="date" />
        <input onChange={getDateTo} value={dateToINPUT} type="date" />
        <Filter
          id="country"
          change={changeCountry}
          value={country}
          infoOption={countryFilter}
        />
        <Filter
          id="price"
          change={changePrice}
          value={price}
          infoOption={priceFilter}
        />
        <Filter
          id="bedroom"
          change={changeBedroom}
          value={bedroom}
          infoOption={bedroomFilter}
        />
        <button onClick={deleteFilter}>Eliminar busqueda</button>
      </div>

      <div className="display-flex-wrap">
        {filteredList.length !== 0 ? (
          filteredList.map((hotel, index) => {
            return (
              <HotelInfo
                key={index}
                slug={hotel.slug}
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
          <Error
            className="error-container display-flex"
            text="Ups, no se han encontrado resultados."
          />
        )}
      </div>
    </div>
  );
}
