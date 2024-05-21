require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const Contact = require('./models/contact')
const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response, next) => {
    const timestamp = new Date()
    Contact.countDocuments({})
        .then(total => {
            response.send(`<p>Phonebook has info for ${total} people</p>
            <p> ${timestamp}</p>`)
        })
        .catch(error => next(error))
})

app.get('/api/contacts', (request, response, next) => {
    Contact.find({})
    .then(contacts => {
        response.json(contacts)
    })
    .catch(error => next(error))
})
  
app.get('/api/contacts/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(contact =>{
            if (contact) {
                response.json(contact)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/contacts/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/contacts', (request, response, next) => {
    const body = request.body

    const contact = new Contact({
        name: body.name,
        number: body.number,
    })

    contact.save()
        .then(savedContact =>{
            response.json(savedContact)
        })
        .catch(error => next(error))
})

app.put('/api/contacts/:id', (request, response, next) => {
    const {name, number} = request.body

    Contact.findByIdAndUpdate(request.params.id, {name, number}, {new: true, runValidators: true, context: 'query'})
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message})
    }

    next(error)
}  
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})