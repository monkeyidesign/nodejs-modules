const express = require('express')
const fs = require('fs') //fs file system
const app = express()

app.get('/', (req, resp) => {
    return resp.send('Hello World!')
})

app.get('/todos/', (req, resp) => {
    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return resp.status(500).send('Sorry, something went wrong.')
        }
        const todos = JSON.parse(data);
        return resp.json({todos: todos})
    })
})

app.put('/todos/:id/complete/', (req, resp) => {
    const id = req.params.id

    const findTodoById = (todos, id) => {
        for(let i = 0; i < todos.length; i++){
            if (todos[i].id === parseInt(id)){
                return i
            }
        }
        return -1
    }

    fs.readFile('./store/todos.json', 'utf-8', (err, data) => {
        if (err) {
            return resp.status(500).send('Sorry, something went wrong.')
        }
        let todos = JSON.parse(data);
        const todoIndex = findTodoById(todos, id)

        if(todoIndex === -1){
            return resp.status(404).send("Sorry, not found")
        }
        todos[todoIndex].complete = true

        fs.writeFile('./store/todos.json', JSON.stringify(todos), () =>{
            return resp.json({'status': 'ok'})
        })
    })
})

app.listen(3000, () => {
    console.log('Application is running on http://localhost:3000');
})

