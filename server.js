const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public')); 


let tasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: true },
];

// RESTful API Endpoints
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    const newTask = { id: tasks.length + 1, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        task.title = title !== undefined ? title : task.title;
        task.completed = completed !== undefined ? completed : task.completed;
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send(); 
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
