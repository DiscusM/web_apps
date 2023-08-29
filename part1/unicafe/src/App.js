import { useState } from 'react'

/* Button that handles all feedback inputs */
const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

/* This will make statistics be in table format */
const StatisticsLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

/* We get states as parameters and use them to calculate and display statistics */
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good + bad * -1) / all
  const positive = (good / all) * 100

  /* If no feedback yet don't show it */
  if (all === 0){
    return(
      <div>
        <h1>statistics</h1>
        <p>no feedback yet</p>
      </div>
    )
  }

  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good}/>
          <StatisticsLine text="neutral" value={neutral}/>
          <StatisticsLine text="bad" value={bad}/>
          <StatisticsLine text="all" value={all}/>
          <StatisticsLine text="average" value={average.toFixed(2)}/>
          <StatisticsLine text="positive" value={positive.toFixed(2) + '%'}/>
        </tbody>
      </table>
    </div>
  )
}

/* Main app that handles states */
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App