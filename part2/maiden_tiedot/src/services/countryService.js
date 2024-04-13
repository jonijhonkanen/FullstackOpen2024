import axios from 'axios';

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getAll = () => {
  const request = axios.get(`${baseURL}/all`);
  return request.then((response) => response.data);
};

//Unused
const getSearched = (id) => {
  const request = axios.get(`${baseURL}/name/${id}`);
  return request.then((response) => response.data);
};

const countryServiceFunctions = { getSearched, getAll };

export default countryServiceFunctions;
