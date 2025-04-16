import Person from "./Person.jsx";

const PersonList = ({persons}) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.id} name={person.name} number={person.number}/>
            )}
        </div>
    );
}

export default PersonList;