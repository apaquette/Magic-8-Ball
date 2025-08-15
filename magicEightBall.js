const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var app = express();

const magicEightBallAnswers = [
    "It is certain",
    "Without a doubt",
    "Yes",
    "Most likely",
    "Don't count on it",
    "Very doubtful",
    "My sources say no",
    "Outlook not good"
];

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.use(express.static('views/images'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.listen(8080);

app.get('/', function(req,res){
    res.render('home');//load homepage
});

app.post('/answer', function(req,res){
    var question = req.body.theQuestion; //retrieves question from form
    saveToDatabase(question); //saves question to database
    answer = magicEightBallAnswers[Math.floor(Math.random()*7)];//picks an answer randomnly (0-7)
    console.log(answer); //post answer to console log
    var myData = {//package data
        "question":question,
        "answer":answer
    }
    res.render('answer', myData);//post answer to answers page
});

//save to database function
function saveToDatabase(question){
    var con = mysql.createConnection({//connection data
        host: "localhost",
        user: "Alex",
        password: "2U4&mgIfcN@B",
        database: "cis225"
    });

    con.connect(function (err) {
        if (err) throw err;

        var sql = "INSERT INTO questions(questions) values('"+ question +"');";//database query

        con.query(sql, function (err, result) {//write to database
            if (err) throw err;
        });
    });
}