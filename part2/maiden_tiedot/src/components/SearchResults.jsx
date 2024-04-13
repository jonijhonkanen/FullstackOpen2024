import CountryInfo from './CoutryInfo';
import CountryCard from './CountryCard';

const SearchResults = ({ countriesToShow, showCountry, countryWeather }) => {
  return countriesToShow.length === 1 ? (
    <CountryInfo data={countriesToShow[0]} weather={countryWeather} />
  ) : countriesToShow.length > 1 && countriesToShow.length < 11 ? (
    <div>
      {countriesToShow.map((country) => (
        <CountryCard
          key={country.name}
          countryData={country}
          showCountry={showCountry}
        />
      ))}
    </div>
  ) : countriesToShow.length > 10 ? (
    <div>Too many matches, specify another filter</div>
  ) : (
    <div>No matches, please specify your filter</div>
  );
};

export default SearchResults;
