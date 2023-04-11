import express from "express"
const app = express()
import axios from "axios"
import cors from "cors"
import "dotenv/config.js"


const headers = {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'covid-19-statistics.p.rapidapi.com'
  }
// -----------------------

app.use(cors());

app.get('/', (req, res) => {
    res.send("This is home")
    console.log("Home page loaded");
})

app.get('/world-statistic/', async (req, res) => {
    const date = req.params.date

    const worldStat = await axios.get('https://covid-19-statistics.p.rapidapi.com/reports/total', 
    { headers: headers, 
    //   params: { date: date } 
    })
    .then((response) => {
        res.json(response.data) // .data
        console.log(response.data.data);
        // console.log(`Confirmed cases globally : `, response.data.data.confirmed);
    })
    .catch((error) => {
        console.log(error);
    });
});

app.get('/covid-statistics/:country', async (req, res) => {
    const country = req.params.country

    const countryStat = await axios.get('https://covid-19-statistics.p.rapidapi.com/reports', 
     { headers: headers,
       params: 
       { region_name: country }
    })
    .then((response) => { 
        const allData = response.data.data // response.data key returns the value "data" , which stores an array of objects. Using this info, I can use the proper iteration methods

        const finalData = allData.map(number => number.region.province + ": " + number.confirmed)


        console.log(finalData);
        res.json(allData)
    })
    .catch((error) => {
        console.log(error);
    });
});

// -----SPECIFIC DATE FOR COUNTRY-----

app.get('/covid-statistics/:country/:date', async (req, res) => {
    const { country, date } = req.params

    const countryStat = await axios.get('https://covid-19-statistics.p.rapidapi.com/reports', 
     { headers: headers,
       params: 
       { region_name: country,
         date: date,
         }
    })
    .then((response) => { 
        const allData = response.data.data

        const finalData = allData.map(number => number.region.province + ": " + number.confirmed)

        console.log(finalData);
        res.json(finalData)
    })
    .catch((error) => {
        console.log(error);
    });
});

// -----SPECIFIC PROVINCE-----

app.get('/covid-statistics/:country/=/:province', async (req, res) => { // current hack to solve two params in same URL location
    const { country, province } = req.params

    const countryStat = await axios.get('https://covid-19-statistics.p.rapidapi.com/reports', 
     { headers: headers,
       params: 
       { region_name: country,
         region_province: province,
         }
    })
    .then((response) => { 
        const allData = response.data.data

        const finalData = allData.map(number => number.region.province + ": " + number.confirmed)

        console.log(finalData);
        res.json(finalData)
    })
    .catch((error) => {
        console.log(error);
    });
});

// -----SPECIFIC PROVINCE WITH DATE-----

app.get('/covid-statistics/:country/:date/:province', async (req, res) => { 
    const { country, province, date } = req.params

    const countryStat = await axios.get('https://covid-19-statistics.p.rapidapi.com/reports', 
     { headers: headers,
       params: 
       { region_name: country,
         region_province: province,
         date: date }
    })
    .then((response) => { 
        const allData = response.data.data

        const finalData = allData.map(number => number.region.province + ": " + number.confirmed)

        console.log(finalData);
        res.json(finalData)
    })
    .catch((error) => {
        console.log(error);
    });
});



// -----SPECIFIC COUNTRY NAME-----

app.get('/regions', async (req, res) => {
    const countryList = await axios.get('https://covid-19-statistics.p.rapidapi.com/regions', 
    { headers: headers
    })
    .then((response) => {
        const listData = response.data.data

        res.json(listData)
    })
    .catch((error) => {
        console.log(error)
    });
});


app.listen(3001, () => {
    console.log("listening on port 3001... for COVID info");
});