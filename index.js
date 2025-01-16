const express = require('express');
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


const port = 8080;

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Apnacollege",
        content: "I love coding",
    },
    {   id: uuidv4(),
        username: "Trinity College",
        content: "I belevels in Teaching",
    },{ id: uuidv4(),
        username: "Tit College",
        content: "My placement is awesome",
    },{ id: uuidv4(),
        username: "LNCT college",
        content: "This is the first Institute in Bhopal",
    },
];

// Main Content
app.get('/post', function(req, res){
    res.render("index.ejs" , {posts});
});

// Form to create a new post
app.get('/post/new', function(req, res){
    res.render("new.ejs");
});

// Show a single post
app.get('/post/:id', function(req, res){
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    if(!post){
        return res.status(404).send("Post not found");
    }
    res.render("show.ejs", {post});
});

// Edit a post #PATCH_Request
app.patch('/post/:id', function(req, res){
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    res.redirect('/post');
});

// This is Edit Page
app.get('/post/:id/edit', function(req, res){
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
});

// Delete a post #DELETE_REQUEST

app.delete('/post/:id', function(req, res){
    let {id} = req.params;
    posts = posts.filter((p)=> id!== p.id);
    res.redirect('/post');
});


app.post('/post', function(req, res){
    let{username, content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    // res.send("Completed!");
    res.redirect('/post');
});






app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
});