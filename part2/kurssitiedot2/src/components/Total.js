import React from "react"

const Total = ({parts}) => {
    const total = parts.reduce((total, part) => total + part.exercises, 0)
    return(
      <div>
        <b>Total number of exercises is {total}</b>
      </div>
    )
}
  
export default Total;