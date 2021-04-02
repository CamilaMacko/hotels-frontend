import React from "react";
import { initialStates } from "./resources/initialStates";

export default function Results(props) {
  return (
    <div className="result">
      {props.result && <span>Resultado de búsqueda de hoteles, </span>}
      {props.dateFrom !== initialStates[0].value ? (
        <span>
          desde el <span>{props.dateFromText} </span>
        </span>
      ) : null}
      {props.dateTo !== initialStates[0].value ? (
        <span>
          hasta el <span>{props.dateToText} </span>
        </span>
      ) : null}
      {props.country !== initialStates[1].value ? (
        <span>
          en <span>{props.country} </span>
        </span>
      ) : null}
      {props.price !== initialStates[2].value ? (
        <span>
          en un hotel <span>{props.price} </span>
        </span>
      ) : null}
      {props.bedroom !== initialStates[3].value ? (
        <span>
          con capacidad <span>{props.bedroom} </span>
        </span>
      ) : null}
    </div>
  );
}
