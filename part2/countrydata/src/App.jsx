import {useEffect, useState} from "react";
import axios from "axios";
import CountryList from "./components/CountryList.jsx";

const App = () => {
  const [search, setSearch] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountryList(response.data);
      })
  }, []);

  const countriesToShow = countryList.filter(c => c.name.common.toLowerCase().includes(search));

  const handleSearchChange = event => {
    setSearch(event.target.value);
    setSelectedCountry(null);
  }

  return (
    <>
      <h1>Country Data</h1>
      <div>
        search countries <input value={search} onChange={handleSearchChange}/>
      </div>
      <div>
        <CountryList
          countries={countriesToShow}
          selectedCountry={selectedCountry}
          onCountrySelected={setSelectedCountry}
        />
      </div>
    </>
  )
}

export default App;
