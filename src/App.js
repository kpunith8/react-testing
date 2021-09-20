import React, { useEffect, useMemo, useState } from "react";
import { convertFetch } from "./utils/currency";

export default function App() {
  const [targetCurrency, setTargetCurrency] = useState('CAD')
  const [currencies, setCurrencies] = useState({})

  useEffect(() => {
    const getData = async () => {
      const currencyData = await convertFetch()
      setCurrencies(currencyData)
    }
    getData()
  }, [])

  const currencyNames = useMemo(() => {
    let names = []
    for (let key in currencies.rates) {
      names.push(key)
    }

    return names
  }, [currencies.rates])


  return (
    <div style={{ padding: '20px 40px' }}>
      <h2>Currecy Converter</h2>
      <label>Select a currency to convert(Base EUR):</label>
      <br />
      <select style={{ marginTop: 30, height: 30, width: 100 }} name="currency" id="currency" onChange={e => setTargetCurrency(e.target.value)} value={targetCurrency}>
        {currencyNames.map(currency => {
          return <option key={currency} value={currency} >{currency}</option>
        })}
      </select>
      {currencies.rates && (
        <h3 style={{ marginTop: 30 }}>
          EUR to {targetCurrency} = {currencies?.rates[targetCurrency]}
        </h3>
      )}

    </div>
  );
}
