import Axios from "axios";

// If key gets expired try to create a new one at https://fxmarketapi.com/

export const fetchCurrencyRate = () => {
  const promise = new Promise((resolve, reject) => {
    Axios.get(
      `https://fxmarketapi.com/apilive?api_key=${process.env.REACT_APP_API_KEY}&currency=USDINR`
    )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};

export const fetchCoronaHistory = () => {
  const promise = new Promise((resolve, reject) => {
    Axios.get(`https://corona.lmao.ninja/v2/historical/India?lastdays=7`)
      .then((res) => {
        resolve(res.data.timeline);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};
