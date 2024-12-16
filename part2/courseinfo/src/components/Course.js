import React from "react";

const Course = ({courses}) => {
    return (
        <div>
            {courses.map(
                course => (
                    <div key={course.id}>
                        <Header courses={course.name} />
                        <Content parts={course.parts} />
                        <Total parts={course.parts} />
                    </div>
                )
            )}
        </div>
    )
}

const Header = (props) => {
    return(
        <>
            <h2>{props.courses}</h2>
        </>
    )
}

const Content = ({parts}) => {
    return(
        <div>
            {parts.map(
                part => (
                    <p key={part.id}>{part.name} {part.exercises}</p>
                )
            )}
        </div>
    )


}

const Total = ({parts}) => {
    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return (
        <div>
            <b>total of {total} exercises</b>
        </div>
    )
}

export default Course