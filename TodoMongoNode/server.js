var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();

require('babel-core/register');

app.set('views', path.join(__dirname, ''));
app.set('view engine', './index.html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    credentials: true
}));    

const mongoUrl = "mongodb://localhost:27017/Todoapplication";
mongoose.connect(mongoUrl, (err) => {
    if (err) {
        console.log('Please make sure MongoDb is up and running');
        throw err;
    }
    else {
        console.log('Database connected successfully...')
    }
});

var Todo = require('./models/todo');

app.post('/todo', function (req, res) {
    var test = new Todo();
    test.text = req.body.text;
    test.finished = req.body.finished
    test.save(function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

app.get('/todo', function (req, res) {
    Todo.find(function (err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

app.get('/todo/:id', function (req, res) {
    Todo.find({ _id: req.params.id }, function (err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

app.delete('/todo/:id', function (req, res) {
    var query = { _id: req.params.id };
    Todo.remove(query, function (err, result) {
        if (err) {
            console.log("# API delete Error", err);
        }
        res.json(result);
    });
});

app.put('/todo/:id', function (req, res) {
    var test = req.body;
    var query = req.params.id;
    var update = {
        '$set':
            {
                text: test.text,
                finished: test.finished
            }
    };
    var options = { new: true };
    Todo.findOneAndUpdate(query, update, options, function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result)
    })
});

app.put('/toggle-todo/:id', function (req, res) {
    var test = req.body;
    var query = req.params.id;
    var update = {
        '$set':
            {
                finished: test.finished
            }
    };
    
    var options = { new: true };
    Todo.findOneAndUpdate(query, update, options, function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result)
    })
});

app.listen(5000, function (err) {
    if (err) {
        return console.log('error', err);
    }
    console.log("API Server Is running on 5000");
});

module.exports = app;
