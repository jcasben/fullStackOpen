import CountryDetail from "./CountryDetail.jsx";

const CountryList = ({countries, selectedCountry, onCountrySelected}) => {

  if (countries.length === 1) return <CountryDetail country={countries[0]}/>

  if (selectedCountry) return <CountryDetail country={selectedCountry}/>

  if (countries.length === 0) return <p>No matches</p>;

  if (countries.length > 10) return <p>Too many matches, specify more</p>;

  return (
    <div>
      {countries.map(country =>
        <div>
          {country.name.common}
          <button onClick={() => onCountrySelected(country)}>Show</button>
        </div>
      )}
    </div>
  );
}

export default CountryList;