const Person = ({person, onDelete}) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={() => onDelete(person.id)}>Delete</button>
        </div>
    );
}

export default Person;