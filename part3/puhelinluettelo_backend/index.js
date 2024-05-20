const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


let contacts = [  
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
      },
      {
        id: 2, 
        name: "Ada Lovelace",
        number: "39-44-5323523"
      },
      {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
      },
      {
        id: 4, 
        name: "Mary Poppendieck",
        number: "39-23-6423122"
      },
      {
        id: 5,
        name: "Erkki Esimerkki",
        number: "123456789"
      }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const total = contacts.length
    const timestamp = new Date()
    response.send(`<p>Phonebook has info for ${total} people</p>
                   <p> ${timestamp}</p>`
    )
})

app.get('/api/contacts', (request, response) => {
    response.json(contacts)
})
  
app.get('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)
    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== id)
    response.status(204).end()
})

app.post('/api/contacts', (request, response) => {
    const body = request.body

    if(!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if(!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if(contacts.some(contact => contact.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const contact = {
        id: Math.floor(Math.random() * 100000) + 1,
        name: body.name,
        number: body.number,
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})