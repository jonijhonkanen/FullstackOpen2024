//Display individual country name with a button
const CountryCard = ({ countryData, showCountry }) => {
  return (
    <div>
      {countryData.name}{' '}
      <button onClick={() => showCountry(countryData.name)}>show</button>
    </div>
  );
};

export default CountryCard;
