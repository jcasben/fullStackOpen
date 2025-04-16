import {useEffect, useState} from "react";
import Filter from "./components/Filter.jsx";
import PersonList from "./components/PersonList.jsx";
import AddPersonForm from "./components/AddPersonForm.jsx";
import personService from './services/persons.js';
import Notification from "./components/Notification.jsx";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState('info');

    useEffect(() => {
        personService
            .getAllPersons()
            .then(persons => setPersons(persons));
    }, []);

    const addToPhonebook = (event) => {
        event.preventDefault();

        const person = persons.find(person => person.name === newName);
        if (person) {
            if (confirm(`${newName} is already added to the phonebook. Do you want to replace the old number with a new one?`)) {
                const updatedPerson = {...person, number: newNumber};

                personService
                    .updatePerson(person.id, updatedPerson)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id === person.id ? returnedPerson : p));
                        showNotification(
                            `Updated ${returnedPerson.name} number from ${person.number} to ${updatedPerson.number}`,
                            'info'
                        );
                    })
                    .catch(() => {
                        showNotification(
                            `${person.name} was already deleted from the server`,
                            'error'
                        );
                        setPersons(persons.filter(p => p.id !== person.id));
                    })
            }
        } else {
            const personObj = {
                name: newName,
                number: newNumber,
            };

            personService
                .createPerson(personObj)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson));
                    showNotification(
                        `Added ${newPerson.name}`,
                        'info'
                    );
                })
                .catch(() => {
                    showNotification(
                        `Error creating ${personObj.name}`,
                        'error'
                    );
                })
        }
        setNewName('');
        setNewNumber('');
    }

    const deleteFromPhonebook = id => {
        const person = persons.find(person => person.id === id);
        if (!person) return;

        if (confirm(`Delete ${person.name}?`)) {
            personService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id));
                    showNotification(
                        `Deleted ${person.name}`,
                        'info'
                    );
                })
                .catch(() => {
                    showNotification(
                        `${person.name} was already deleted from the server`,
                        'error'
                    );
                })
        }
    }

    const showNotification = (message, type) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000);
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
            <Notification message={notificationMessage} type={notificationType}/>
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
            <PersonList persons={personsToShow} onDelete={deleteFromPhonebook}/>
        </div>
    );
}

export default App;