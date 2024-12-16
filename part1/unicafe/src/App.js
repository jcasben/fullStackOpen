import React, { useState } from 'react'

const App = () => {
    //initialization of states
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [average, setAverage] = useState(0)

    //strings for the headers of the sections
    const section1 = 'give feedback'
    const section2 = 'statistics'

    //values for pass as props to the components
    const names = ['good', 'neutral', 'bad', 'all', 'average', 'positive']
    let values = [good, neutral, bad, all, average]

    //creation of the event handlers
    const incrementGood = () => {
        setGood( good + 1)
        setAverage(average + 1)
        setAll(all + 1)
    }

    const incrementNeutral = () => {
        setNeutral( neutral + 1)
        setAll(all + 1)
    }

    const incrementBad = () => {
        setBad(bad + 1)
        setAverage(average - 1)
        setAll(all + 1)
    }

    return (
        <div>
            <Header section={section1} />
            <p>
                <Button handleClick={() => incrementGood()} text={names[0]} />
                <Button handleClick={() => incrementNeutral()} text={names[1]} />
                <Button handleClick={() => incrementBad()} text={names[2]} />
            </p>
            <Header section={section2} />
            <Statistics names={names} values={values} />
        </div>
    )
}

/**
 * Components that returns a header for a section
 * @param props Receives the title
 * @returns h1 element with the correspondent title
 * @constructor
 */
const Header = (props) => (
    <>
        <h1>{props.section}</h1>
    </>
)

/**
 * Component used for creating a button
 * @param props Receives an event handler and the text for the button
 * @returns button element with an onClick function
 * @constructor
 */
const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
)

/**
 * Component that creates a table with the names and values of  * @param props Receives an array with the names of the statistics and another array with the values for those
 * statistics
 * @returns a table element which contains the names and values of the statistics
 * @constructor
 */
const Statistics = (props) => {
    if(props.values[3] === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <table>
            <tbody>
                <tr>
                    <StatisticsLine text={props.names[0]} value={props.values[0]} />
                </tr>
                <tr>
                    <StatisticsLine text={props.names[1]} value={props.values[1]} />
                </tr>
                <tr>
                    <StatisticsLine text={props.names[2]} value={props.values[2]} />
                </tr>
                <tr>
                    <StatisticsLine text={props.names[3]} value={props.values[3]} />
                </tr>
                <tr>
                    <StatisticsLine text={props.names[4]} value={props.values[4]/props.values[3]} />
                </tr>
                <tr>
                    <StatisticsLine text={props.names[5]} value={(props.values[0]/props.values[3])*100 + '%'} />
                </tr>
            </tbody>
        </table>
    )
}

const StatisticsLine = (props) => (
    <>
        <td>{props.text}</td>
        <td>{props.value}</td>
    </>
)

export default App
