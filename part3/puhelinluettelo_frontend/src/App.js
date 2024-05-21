import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Filter = ({search, setSearch}) => {
  return (
    <div>
      Filter contacts: <input value={search} onChange={(event) => setSearch(event.target.value)}/>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ error }) => {
  if (error === null) {
    return null
  }

  return (
    <div className="error">
      {error}
    </div>
  )
}

const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, setNotificationMessage, setErrorMessage}) => {
  const handleAdd = (event) => {
    event.preventDefault()

    const nameExists = persons.find(person => person.name === newName)

    if (nameExists){ 
      const confirmed = window.confirm(`${nameExists.name} is already added. Do you want to replace old number with new?`)
      
      if(confirmed){
      const updatedPerson = {...nameExists, number: newNumber}

      personService
      .update(nameExists.id, updatedPerson)
      .then(response => {
        setPersons(persons.map(person => (person.id === nameExists.id ? response.data : person)))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(
          `${nameExists.name}'s phone number updated succesfully.`
        ) 
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.error('Error updating person:', error)
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
      });
    }

    } else {
      const newPerson = { name: newName, number: newNumber }

      personService
      .create(newPerson)
      .then(response => {
        setPersons([...persons, response.data])
        setNewName('')
        setNewNumber('')
        setNotificationMessage(
          `Added ${newPerson.name}`
        ) 
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
    })
    .catch(error => {
      console.error('Error adding person:', error)
      setErrorMessage(error.response.data.error)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    })
  }
}

  return (
    <form onSubmit={handleAdd}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Contacts = ({contacts, handleDelete}) => {
  return (
    <ul>
        {contacts.map((person, index) => (
          <li key={index}>{person.name} : {person.number} : <button type="button" onClick={() => handleDelete(person.id)}>delete</button></li>
        ))}
      </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notification, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  },  [])

  const filteredList = search
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons


  const handleDelete = (id) => {
    const confirmed = window.confirm('Delete contact?')
    
    if(confirmed){
      const personToDelete = persons.find(person => person.id === id);
      
      personService
      .deleteContact(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setNotificationMessage(
          `Deleted ${personToDelete.name}'s contact info`
        ) 
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
    })
    .catch(error => {
      console.error('Error deleting person:', error)
      setErrorMessage(error.response.data.error)
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    })
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} setNotificationMessage={setNotificationMessage}/>
      <Error error={errorMessage} setErrorMessage={setErrorMessage}/>
      <Filter search={search} setSearch={setSearch}/>
      <h2>Add new</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      <Contacts contacts={filteredList} handleDelete={handleDelete}/>
    </div>
  )
}

export default App