// implement your API here
const express = require('express')

const port = 5000

const server = express()

server.use(express.json())

server.post('/api/users', (req, res) => {
    // console.log(req.body)
    const {name, bio} = req.body
    if (!name || !bio) res.status(400).json({errorMessage: "Please provide name and bio for the user."})
})

server.listen(port, () => console.log(`\n=== Listening on port ${port} ===\n`))