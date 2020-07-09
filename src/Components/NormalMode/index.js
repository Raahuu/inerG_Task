import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import { Bar } from "react-chartjs-2";
import Moment from "moment";
import classes from "./style.module.css";
import { fetchCurrencyRate, fetchCoronaHistory } from "../../Helper/API";

const NormalMode = () => {
  // Variables
  const [exchangeRate, setExchangeRate] = useState(0);
  const [datesForGraph, setDatesForGraph] = useState([]);
  const [coronaGraphData, setCoronaGraphData] = useState({
    cases: [],
    deaths: [],
    recovered: [],
  });

  useEffect(() => {
    // Initial Fetch
    fetchLiveExchangeRate();
    fetchCoronaCases();

    const API_Call_Interval = setInterval(() => {
      // Repeated Fetch on every minute
      fetchLiveExchangeRate();
    }, 60000);

    return () => {
      clearInterval(API_Call_Interval);
    };
  }, []);

  const fetchLiveExchangeRate = () => {
    fetchCurrencyRate()
      .then((res) => {
        setExchangeRate(res.price.USDINR / 100);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const fetchCoronaCases = () => {
    fetchCoronaHistory()
      .then((res) => {
        setDatesForGraph(Object.keys(res.cases));

        Object.keys(res).forEach((key) => {
          if (key === "cases") {
            setCoronaGraphData({
              ...coronaGraphData,
              cases: Object.values(res.cases),
            });
          } else if (key === "recovered") {
            setCoronaGraphData({
              ...coronaGraphData,
              recovered: Object.values(res.recovered),
            });
          } else if (key === "deaths") {
            setCoronaGraphData({
              ...coronaGraphData,
              deaths: Object.values(res.deaths),
            });
          }
        });
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const getGraphLabels = () => {
    let dateArray = [];

    for (let i = 0; i < 7; i++) {
      dateArray.push(Moment(datesForGraph[i]).format("DD-MM-YYYY"));
    }

    return dateArray;
  };

  const barData = {
    labels: getGraphLabels(),

    datasets: [
      {
        label: "Cases",
        borderWidth: 1,
        backgroundColor: "#ffc299",
        borderColor: "#cc5200",
        hoverBackgroundColor: "#ed873e",
        hoverBorderColor: "#e35f00",
        data: coronaGraphData.cases,
      },
      {
        label: "Recovered",
        borderWidth: 1,
        backgroundColor: "#b3ffb3",
        borderColor: "#00ff00",
        hoverBackgroundColor: "#55cf72",
        hoverBorderColor: "#2c9c46",
        data: coronaGraphData.recovered,
      },
      {
        label: "Deaths",
        borderWidth: 1,
        backgroundColor: "#de8078",
        borderColor: "#fa6457",
        hoverBackgroundColor: "#d73627",
        hoverBorderColor: "#ff4636",
        data: coronaGraphData.deaths,
      },
    ],
  };

  return (
    <div className={classes.container}>
      <div className={classes.gaugeContainer}>
        <GaugeChart
          id="gauge-chart2"
          nrOfLevels={20}
          percent={exchangeRate}
          textColor="#000"
        />
        <p>Live Exchange rate from USD to INR. Updates every minute</p>
      </div>
      <div className={classes.chartContainer}>
        <Bar
          data={barData}
          height={275}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
        <p>Corona cases till now in India</p>
      </div>
    </div>
  );
};

export default NormalMode;
