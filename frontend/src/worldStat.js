import React from "react";

export default function WorldStat({ data, setData }) {


    function getCov() {
        fetch('/world-statistic')
        .then(response => response.json())
        .then(data => setData(data))
        // console.log(data);
    }
        
  return (
      <>
      <button onClick={getCov}>Refresh World Stat</button>
      &nbsp;&nbsp;&nbsp;
      {!data ? "<= Click to see accumulated COVID19 cases worldwide" : `Current confirmed COVID19 cases globally: ${data.data.confirmed}`}
      {/* {!data ? "Loading..." : `Current confirmed COVID19 cases globally: ${worldData}`} */}
      </>

  )
}
