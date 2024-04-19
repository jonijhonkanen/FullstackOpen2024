const CountryInfo = ({ data, weather }) => {
  const { name, capital, area, languages, flag } = data;
  const { temperature, wind, icon } = weather;
  const iconURL = `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div>
      <h1>{name}</h1>
      <div>capital {capital[0]}</div>
      <div>area {area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img className="countryFlag" src={flag} width="150" />
      {temperature && (
        <div>
          <h2>Weather in {capital[0]}</h2>
          <p>temperature {temperature} Celsius</p>
          <img className="weatherIcon" src={iconURL} width="80" />
          <p>wind {wind} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
