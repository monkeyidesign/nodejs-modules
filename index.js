const express = require('express')
const fs = require('fs') //fs file system
const app = express()

app.get('/', (req, resp) => {
    return resp.send('Hello World!')
})

app.get('/todos', (req, resp) => {
    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return resp.status(500).send('Sorry, something went wrong.')
        }
        const todos = JSON.parse(data);
        return resp.json({todos: todos})
    })
})

app.listen(3000, () => {
    console.log('Application is running on http://localhost:3000');
})