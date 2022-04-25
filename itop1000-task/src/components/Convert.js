import React from "react";
import "materialize-css/dist/css/materialize.min.css";

export default function Convert(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;

  return (
    <>
      <div className="row">
        <div className="col s6">
          <label>Сума:</label>
          <input type="number" value={amount} onChange={onChangeAmount} />
        </div>

        <div className="col s6">
          <label>Валюта:</label>
          <select
            value={selectedCurrency}
            className="browser-default col s12"
            onChange={onChangeCurrency}
          >
            {currencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
