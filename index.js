const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid');

var methodOverride = require('method-override')
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(methodOverride('_method'))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set("view engine","ejs")

// Our fake database:
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]


// INDEX - renders multiple comments
app.get("/comments",(req,res)=>{
    res.render("index",{comments});
})

// NEW - renders a form
app.get("/comments/new",(req,res)=>{
    res.render("new");
})

// updates a particular comment
app.patch("/comments/:id",(req,res)=>{
    const {id} = req.params;
    const newcomment = req.body.comment;
    const foundcomment = comments.find(c => c.id === id)
    foundcomment.comment = newcomment;
    res.redirect("/comments")
})

// SHOW - details about one particular comment
app.get("/comments/:id",(req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render("show",{comment});
})

// CREATE - creates a new comment
app.post("/comments",(req,res)=>{
    const {username,comment} = req.body;
    comments.push({id:uuid(),username,comment});
    res.redirect("/comments");
})

// EDIT - renders a form to edit a comment
app.get("/comments/:id/edit",(req,res)=>{
    const {id} = req.params;
    const comment = comments.find(c => c.id === id)
    res.render("edit",{comment});
})

// DELETE/DESTROY- removes a single comment
app.delete("/comments/:id",(req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c=>c.id!=id);
    res.redirect("/comments");
})

app.listen(8080,()=>{
    console.log("listening");
})