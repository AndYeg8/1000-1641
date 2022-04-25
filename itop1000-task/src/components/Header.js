import React from "react";
import "materialize-css/dist/css/materialize.min.css";

export default function Header(props) {
  const uahUsd = (props.data.rates.UAH / props.data.rates.USD).toFixed(4);
  const uahEur = props.data.rates.UAH.toFixed(4);
  console.log("Header : uahUsd & uahEur=", uahUsd, uahEur);

  return (
    <>
      <div className="row">
        <div className="col s12">
          <h4>Курс валют на </h4>
          <h4>{props.data.date}:</h4>
        </div>
        <div className="col s6">
          <div>Назва:</div>
        </div>
        <div className="col s6">
          <div>Курс гривні:</div>
        </div>
        <div className="col s6 card-panel light-green lighten-3">
          <div>долар США</div>
        </div>
        <div className="col s6 card-panel light-green lighten-3">
          <div>{uahUsd}</div>
        </div>
        <div className="col s6 card-panel cyan lighten-4 ">
          <div>євро</div>
        </div>
        <div className="col s6 card-panel cyan lighten-4 ">
          <div>{uahEur}</div>
        </div>
      </div>
    </>
  );
}
