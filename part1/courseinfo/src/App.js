const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React:',
      exercises: 10
    },
    {
      name: 'Using props to pass data:',
      exercises: 7
    },
    {
      name: 'State of a component:',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

const Header = (props) => {
  return(
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part parttittle1={props.parts[0].name} partnumber1={props.parts[0].exercises} />
      <Part parttittle2={props.parts[1].name} partnumber2={props.parts[1].exercises} />
      <Part parttittle3={props.parts[2].name} partnumber3={props.parts[2].exercises} />
    </div>
  )
}

const Part = (props) => {
  return(
    <>
      <p>
        {props.parttittle1} {props.partnumber1}
      </p>
      <p>
        {props.parttittle2} {props.partnumber2}
      </p>
      <p>
        {props.parttittle3} {props.partnumber3}
      </p>
    </>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

export default App