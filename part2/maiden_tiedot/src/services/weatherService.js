import axios from 'axios';

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const api_key = import.meta.env.VITE_SOME_KEY;

const getCapitalWeatherData = (capital) => {
  //console.log(`${weatherURL}${capital}&appid=${api_key}`);
  console.log(`Fetching weather data!`);
  const request = axios.get(
    `${weatherURL}${capital}&appid=${api_key}&units=metric`
  );
  return request.then((response) => response.data);
};

const weatherServiceFunctions = { getCapitalWeatherData };

export default weatherServiceFunctions;
