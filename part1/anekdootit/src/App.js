import { useState } from 'react'

/* Button that handles all feedback inputs */
const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

/* Main app that handles states */
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  /* States for anecdotes, points, and anecdote with mostpoints */
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))
  const mostPoints = points.indexOf(Math.max(...points))

  /* Ramndomly sets anecdote to show */
  const handleAnecdote = () => {
    const newAnecdote = Math.floor(Math.random() * anecdotes.length)
    setSelected(newAnecdote)
  }

  /* Add points into array*/
  const handleVote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>
        {"has " + points[selected] + " votes"}
      </div>
        <div>
        <Button onClick={handleVote} text="vote"/>
        <Button onClick={handleAnecdote} text="next anecdote"/>
        </div>
        <h2>Anecdote with most votes</h2>
        {anecdotes[mostPoints]}
        <div>
          {"has " + points[mostPoints] + " votes"}
        </div>
    </div>
  )
}

export default App
