import {useState} from "react";
import Filter from "./components/Filter.jsx";
import PersonList from "./components/PersonList.jsx";
import AddPersonForm from "./components/AddPersonForm.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ]);
    const [nextId, setNextId] = useState(5);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

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