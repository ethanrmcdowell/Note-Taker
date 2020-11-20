let express = require("express");
let path = require("path");
let db = require("./db/db");
let app = express();
let PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + "/public/", "index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname + "/public/", "notes.html"));
});

app.get("/api/notes", function(req, res){
    res.json(db);
});

app.post("/api/notes", function(req, res){
    db.push(req.body);
    res.json(true);
});

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT);
});