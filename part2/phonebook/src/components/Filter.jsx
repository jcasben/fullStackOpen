const Filter = ({value, onValueChange}) => {
    return (
        <div>
            filter by name <input value={value} onChange={onValueChange}/>
        </div>
    )
}

export default Filter;