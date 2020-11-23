const express = require("express");
const path = require("path");
const db = require("./db/db");
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const app = express();
const PORT = process.env.port || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname + "/public/", "notes.html"));
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/public/", "index.html"));
});

app.get("/api/notes", function(req, res){
    res.json(db);
});

app.post("/api/notes", function(req, res){
    req.body.id = uuidv4();
    db.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(db), function(err){
        if (err) throw err;
        res.json(db);
    })
});

app.delete("/api/notes/:id", function(req, res){
    let id = req.params.id;
    for(i=0; i < db.length; i++){
        if (id === db[i].id){
            db.splice(i,1);
        }
    }
    fs.writeFile("./db/db.json", JSON.stringify(db), function(err){
        if(err) throw err;
        res.json(db);
    })
});

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});