var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    id: String,
    text: String,
    finished: Boolean

});

var Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
