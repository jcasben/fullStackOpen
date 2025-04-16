import Person from "./Person.jsx";

const PersonList = ({persons, onDelete}) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.id} person={person} onDelete={onDelete}/>
            )}
        </div>
    );
}

export default PersonList;