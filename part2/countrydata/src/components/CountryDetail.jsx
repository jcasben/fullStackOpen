const CountryDetail = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
      </div>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages || {}).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div>
  );
}

export default CountryDetail;