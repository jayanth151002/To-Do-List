// index - GET - /comments - display all comments
// post - POST - /comments - post new Comment
// show - GET - /comments/:id - display one comments
// update - PATCH - /comments/:id - update a comment
// delete - DELETE - /comments/:id - delete a comment


const express = require('express')
const path = require('path');
const app = express();
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');

let todo = [];


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home.ejs', { todo });
})

app.get('/new', (req, res) => {
    res.render('create.ejs', { todo });
})

app.post('/', (req, res) => {
    const { heading, description } = req.body;
    if (heading !== "" && description !== "") {
        todo.push({ heading, description, id: uuid() });
        res.redirect('/')
    }
    else {
        res.render('create.ejs', { todo });
    }
})

app.get('/:id', (req, res) => {
    const { id } = req.params;
    const activity = todo.find(c => c.id === id);
    res.render('show.ejs', { activity });
})

app.get('/:id/edit', (req, res) => {
    const { id } = req.params;
    const activity = todo.find(c => c.id === id);
    res.render('edit.ejs', { activity });
})

app.patch('/:id', (req, res) => {
    const { id } = req.params;
    if (req.body.description != "" && req.body.description.length <= 90) {
        const findAct = todo.find(c => c.id === id);
        console.log(req.body.description.length)
        findAct.description = req.body.description;
        res.redirect('/')
    }
    else if (req.body.description.length > 90) {
        const { id } = req.params;
        const activity = todo.find(c => c.id === id);
        res.render('edit.ejs', { activity });
    }
    else {
        const activity = todo.find(c => c.id === id);
        res.render('edit.ejs', { activity });
    }
})

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    todo = todo.filter(c => c.id !== id);
    res.redirect('/')
})

app.listen(5000, () => {
    console.log("Port 5000");
})