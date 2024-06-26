const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  console.log(props)
  return(
    <div>
      <p>{props.part} {props.exer}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return(
    <div>
      <Part part={props.part[0].name} exer={props.part[0].exercises}/>
      <Part part={props.part[1].name} exer={props.part[1].exercises}/>
      <Part part={props.part[2].name} exer={props.part[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return(
    <div>
      <p>Total number of exercises is {props.part[0].exercises + props.part[1].exercises + props.part[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  return  (
    <div>
      <Header course={course.name}/>
      <Content part={course.parts}/>
      <Total part={course.parts}/>
    </div>
  )
}

export default App;


