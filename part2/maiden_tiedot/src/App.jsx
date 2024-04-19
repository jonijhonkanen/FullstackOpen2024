import { useState, useEffect } from 'react';
import SearchFilter from './components/SearchFilter';
import SearchResults from './components/SearchResults';
import countryService from './services/countryService';
import weatherService from './services/weatherService';

const App = () => {
  //Weather data of the current single country
  const [countryWeather, setCountryWeather] = useState(null);
  //Filter search results
  const [countryFilter, setCountryFilter] = useState('');
  //Contains all 250 entries processed
  const [countryData, setCountryData] = useState(null);

  //Fetches the country data
  useEffect(() => {
    //console.log('effect');
    countryService
      .getAll()
      .then((data) => {
        //console.log(data);

        //Store country data to object array
        let dataArray = [];
        data.map((country) => {
          dataArray.push({
            name: country.name.common,
            area: country.area,
            capital: country.capital,
            languages: country.languages,
            flag: country.flags.png,
          });
        });
        //Country data is saved
        setCountryData(dataArray);
      })
      .catch((error) => {
        console.log('Failed to get countries!');
        console.log(error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value);
  };

  const showCountry = (name) => {
    //console.log(`Show info for ${name}`);
    setCountryFilter(name);
  };

  const getCapitalWeather = () => {
    const countryCapital = countriesToShow[0].capital[0];
    //Fetch only if weather data does not exist
    //Weather data into object
    let capitalData = {};
    if (!countryWeather) {
      weatherService
        .getCapitalWeatherData(countryCapital)
        .then((data) => {
          //console.log(data);
          //Insert data into object
          capitalData.icon = data.weather[0].icon;
          capitalData.temperature = data.main.temp;
          capitalData.wind = data.wind.speed;
          setCountryWeather(capitalData);
        })
        .catch((error) => {
          console.log('Failed to fetch weather data!');
          console.log(error);
        });
    } else if (countryWeather) {
      //console.log(countryWeather);
      console.log('Weather data already exists!');
      capitalData = countryWeather;
    }

    return capitalData;
  };

  //Reset the existing weather data
  const resetWeather = () => {
    if (countryWeather) {
      console.log('Current weather data has been reset');
      setCountryWeather(null);
    }
    return null;
  };

  //Filter search results with form filter
  const countriesToShow =
    countryFilter.length > 0
      ? countryData.filter((country) =>
          country['name'].toLowerCase().includes(countryFilter.toLowerCase())
        )
      : countryData;

  //Handle weather data fetches and resets
  const countryWeatherFetch =
    countryData && countriesToShow.length === 1
      ? getCapitalWeather()
      : countryData &&
        countryWeather &&
        countriesToShow.length > 1 &&
        countriesToShow.length < 251
      ? resetWeather()
      : null;

  //Render
  return (
    <div>
      <SearchFilter
        countryFilter={countryFilter}
        handleFilterChange={handleFilterChange}
      />
      {countriesToShow ? (
        <SearchResults
          countriesToShow={countriesToShow}
          showCountry={showCountry}
          countryWeather={countryWeatherFetch}
        />
      ) : (
        <div>No data to show</div>
      )}
    </div>
  );
};

export default App;
