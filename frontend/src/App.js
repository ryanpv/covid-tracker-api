import { React, useEffect, useState } from 'react';
import CountryStat from './countryStat';
// import { useParams, Route, Routes } from "react-router-dom"
import WorldStat from './worldStat';

function App() {

  const [data, setData] = useState(null);
  const [countryState, setCountryState] = useState(null);


useEffect(() => {
  console.log("useEffect has been ran");
  console.log("rerendering state: ", data);
  console.log("rendering country state: ", countryState)
})



///////////////////////////////////////////////RETURN SECTION (JSX)//////////////////////////////////////////////////////////////////
  return (
    <>
        <h1>COVID INFORMATION</h1>
        <h2>Certain COVID19 statistics may NOT be available (i.e. Vietnam's individual province count)</h2>
        <span>
          <div>
        <WorldStat data={data} setData={setData}/>
        </div>
        <br></br>
        <div>
          <CountryStat countryState={countryState} setCountryState={setCountryState}/>
        </div>
          </span>
    </>
  )
  }

export default App;


// https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics/