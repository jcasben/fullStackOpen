import React, { useState } from 'react'

const App = () => {

    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

    const votes = Array(anecdotes.length).fill(0)

    const [selected, setSelected] = useState(0)

    let [voted, setVoted] = useState(votes)

    const generateRandom = () => (
        setSelected(Math.floor(Math.random() * anecdotes.length))
    )

    const vote = () => {
        const copy = [...voted]
        copy[selected] = copy[selected] + 1
        return(
            setVoted(voted = copy)
        )
    }

    return (
        <div>
            <Header text='Anecdote of the day' />
            <Anecdote anecdotes={anecdotes} selected={selected} voted={voted} />
            <div>
                <Button handleClick={() => vote()} text='vote' />
                <Button handleClick={() => generateRandom()} text='next anecdote' />
            </div>
            <Header text='Anecdote with most votes' />
            //Selected receives an expression that calculates the index of the maximum value of voted
            <Anecdote anecdotes={anecdotes} selected={voted.findIndex((m) => m === Math.max(...voted))}
                      voted={voted}/>
        </div>
    )
}

const Header = (props) => (
    <h1>{props.text}</h1>
)

const Button = (props) => (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
)

const Anecdote = (props) => (
    <>
        <p>{props.anecdotes[props.selected]}</p>
        <p>has {props.voted[props.selected]} votes</p>
    </>
)

export default App

