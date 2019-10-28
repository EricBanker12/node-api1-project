// implement your API here
const express = require('express')
const db = require('./data/db')

const port = 5000

const server = express()

server.use(express.json())

// POST: Add a new user
server.post('/api/users', (req, res) => {
    // console.log(req.body)
    const {name, bio} = req.body
    
    if (!name || typeof name != 'string' || typeof bio != 'string') {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    }
    else {
        const date = new Date()
        const user = {
            name,
            bio,
            created_at: date,
            updated_at: date,
        }

        db.insert(user)
        .then(({id}) => {
            res.status(201).send({...user, id})
        })
        .catch(err => {
            // console.log(err)
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
    }
})

// GET: Get all users
server.get('/api/users', (req, res) => {
    db.find()
    .then(resp => {
        // console.log(resp)
        res.send(resp)
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

// GET: Get a user by id
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(resp => {
        // console.log(resp, typeof resp)
        if (resp) res.send(resp)
        else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved." })
    })
})

server.listen(port, () => console.log(`\n=== Listening on port ${port} ===\n`))