import {useEffect, useState} from "react";
import Filter from "./components/Filter.jsx";
import PersonList from "./components/PersonList.jsx";
import AddPersonForm from "./components/AddPersonForm.jsx";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [nextId, setNextId] = useState(5);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => setPersons(response.data));
    }, []);

    const addToPhonebook = (event) => {
        event.preventDefault();
        if (persons.some(person => person.name === newName)) {
            alert(`${newName} is already added to the phonebook`);
            return;
        }
        const personObj = {
            name: newName,
            number: newNumber,
            id: nextId
        };
        setPersons(persons.concat(personObj));
        setNewName('');
        setNewNumber('');
        setNextId(prev => prev + 1);
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const personsToShow = persons.filter(person => person.name.toLowerCase().startsWith(filter))

    return (
        <div>
            <h1>Phonebook</h1>

            <Filter value={filter} onValueChange={handleFilterChange}/>

            <h2>Add new people</h2>
            <AddPersonForm
                onSubmit={addToPhonebook}
                nameValue={newName}
                numberValue={newNumber}
                onNameChange={handleNameChange}
                onNumberChange={handleNumberChange}
            />

            <h2>Names</h2>
            <PersonList persons={personsToShow}/>
        </div>
    );
}

export default App;