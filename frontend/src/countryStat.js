import { React, useEffect, useRef, useState } from 'react'

export default function CountryStat({ countryState, setCountryState }) {


    const toGetCount = useRef("");
    const [countryList, setCountryList] = useState([]);
    const [dailyCount, setDailyCount] = useState(null);
    const [countryNameTotal, setCountryNameTotal] = useState("");
    const [countryNameDaily, setCountryNameDaily] = useState("");

    useEffect(() => {
        fetch('/regions')
        .then(response => response.json())
        .then(data => setCountryList(data))
        // console.log(countryList)
    });

    function getCount() {
        const countryNameInput = toGetCount.current.value
        setCountryNameTotal(countryNameInput)

        if (countryNameInput) {
          // const country = params.toString()
          const country = document.getElementById("countryInput").value
        fetch(`/covid-statistics/${country}`)
        .then(response => response.json())
        .then(data => setCountryState(data))
        console.log("this is ", country);
      } else {console.log("No value detected....")}
    toGetCount.current.value = null
  };

      function getDailyCount() {
        const countryNameInput = toGetCount.current.value
        setCountryNameDaily(countryNameInput)

        if (countryNameInput) {
          const country = document.getElementById("countryInput").value
        fetch(`/covid-statistics/${country}`)
        .then(response => response.json())
        .then(data => setDailyCount(data))
        console.log("this is ", country);
      } else {console.log("No value detected....")}
      toGetCount.current.value = null
    };
      


  return (
    <>
          <input id="countryInput" list="countryName" type="text" ref={toGetCount} placeholder="Type Country Name"/>
          &nbsp;&nbsp;&nbsp;

          <button onClick={getCount}>Get Total COVID19 Count</button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={getDailyCount}>Show Daily Case Report</button>


          <h3>Type country name for autofill or double click on input for list of countries</h3>

        { countryState ? <p><b>Total COVID-19 Confirmed Count for: { countryNameTotal.toUpperCase() }  </b>
            {countryState.map((prov) => <li key={prov.region.province}>{prov.region.province} - {prov.confirmed}</li>)}</p> : "" }

        { dailyCount ? <p><b>New Daily Reported Cases for: { countryNameDaily.toUpperCase() } (Some case counts are 0 if they have not yet been reported): </b>{ dailyCount.map((count) => <li key={count.region.province}>{count.region.province} - {count.confirmed_diff}</li>) }</p> : "" }
        
        <datalist id="countryName">
                { countryList.map(results => { return (<option key={results.name}>{results.name}</option>) }) }
        </datalist>

    </>
  )
}
