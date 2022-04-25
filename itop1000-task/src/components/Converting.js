import React from "react";
import "materialize-css/dist/css/materialize.min.css";

export default function Converting(props) {
  const {
    leftAmount,
    rightAmount,
    onChangeLeftCurrency,
    onChangeRightCurrency,
    onChangeLeftAmount,
    onChangeRightAmount,
  } = props;

  return (
    <>
      <div className="centr">
        <h5>Конвертер валют:</h5>
      </div>
      <div className="row">
        <div className="col s6">
          <label>Валюта:</label>
          <select
            onChange={onChangeLeftCurrency}
            className="browser-default col s12"
          >
            <option value="disabled selected">Оберіть валюту</option>
            <option value="USD">долар США</option>
            <option value="EUR">євро</option>
            <option value="UAH">гривня</option>
          </select>
        </div>
        <div className="col s6">
          <label>Валюта:</label>
          <select
            onChange={onChangeRightCurrency}
            className="browser-default col s12"
          >
            <option value="disabled selected">Оберіть валюту</option>
            <option value="USD">долар США</option>
            <option value="EUR">євро</option>
            <option value="UAH">гривня</option>
          </select>
        </div>
        <div className="col s6">
          <label>Сума:</label>
          <input
            value={leftAmount}
            onChange={onChangeLeftAmount}
            type="number"
          />
        </div>
        <div className="col s6">
          <label>Сума:</label>
          <input
            value={rightAmount}
            onChange={onChangeRightAmount}
            type="number"
          />
        </div>
      </div>
    </>
  );
}
