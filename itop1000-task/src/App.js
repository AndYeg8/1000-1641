import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Convert from "./components/Convert";
import Converting from "./components/Converting";

const apiUrl = "http://api.exchangeratesapi.io/v1";
const accessKey = "1ca507435cab403be0f7a76fe78a38f2";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setItems] = useState();
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [leftCurrency, setLeftCurrency] = useState();
  const [rightCurrency, setRightCurrency] = useState();
  const [leftAmount, setLeftAmount] = useState(1);
  const [rightAmount, setRightAmount] = useState();

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  let exRate;
  if (leftCurrency === "EUR" && rightCurrency === "UAH") {
    exRate = data.rates.UAH;
  } else if (leftCurrency === "EUR" && rightCurrency === "USD") {
    exRate = data.rates.USD;
  } else if (leftCurrency === "USD" && rightCurrency === "EUR") {
    exRate = 1 / data.rates.USD;
  } else if (leftCurrency === "UAH" && rightCurrency === "EUR") {
    exRate = 1 / data.rates.UAH;
  } else if (leftCurrency === "UAH" && rightCurrency === "USD") {
    exRate = data.rates.USD / data.rates.UAH;
  } else if (leftCurrency === "USD" && rightCurrency === "UAH") {
    exRate = data.rates.UAH / data.rates.USD;
  } else {
    exRate = 1;
  }

  useEffect(() => {
    const url = getApiUrl('/latest', "format=1");

    fetch(url)
      .then((res) => res.json())
      .then(
        (data) => {
          const firstCurrency = Object.keys(data.rates)[0];
          setCurrencyOptions(Object.keys(data.rates));
          setIsLoaded(true);
          setItems(data);
          setFromCurrency(data.base);
          setToCurrency(firstCurrency);
          setExchangeRate(data.rates[firstCurrency]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
 
    if (fromCurrency != null && toCurrency != null) {
      const url = getApiUrl('/latest', `base=${fromCurrency}&symbols=${toCurrency}`)
      fetch(url)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  function handleLeftAmountChange(e) {
    setLeftAmount(e.target.value);
    setRightAmount(e.target.value * exRate);
  }

  function handleRightAmountChange(e) {
    setRightAmount(e.target.value);
    setLeftAmount(e.target.value / exRate);
  }

  function getApiUrl(path, paramsString) {
    return apiUrl + path + "?" + paramsString + "&access_key=" + accessKey;
  }
  if (error) {
    return <div>Помилка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Завантаження...</div>;
  } else {
    return (
      <>
        <Header data={data} />
        <Converting
          onChangeLeftCurrency={(e) => setLeftCurrency(e.target.value)}
          onChangeRightCurrency={(e) => setRightCurrency(e.target.value)}
          leftAmount={leftAmount}
          rightAmount={rightAmount}
          onChangeLeftAmount={handleLeftAmountChange}
          onChangeRightAmount={handleRightAmountChange}
        />
        <div className="centr">
          <h5>Конвертер усіх валют:</h5>
        </div>
        <Convert
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
        />
        <div className="equals">
          <h3>=</h3>
        </div>
        <Convert
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
        />
      </>
    );
  }
}

export default App;
