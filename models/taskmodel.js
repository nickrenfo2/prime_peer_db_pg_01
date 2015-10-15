/**
 * Created by Nick on 10/15/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema ({
    text: String,
    complete: Boolean
});

var tasks = mongoose.model('tasks', taskSchema);

module.exports = tasks;