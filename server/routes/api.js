var express = require('express');
var router = express.Router();
var taskSchema = require('../../models/taskmodel');

router.post('/todos', function(req, res) {
    taskSchema.create(req.body, function (err, post) {
        console.log(post);
        taskSchema.find(function (err, task) {
            if (err) throw err;
            res.json(task);
        })
    });
});

router.get('/todos', function(req, res) {
   taskSchema.find(function(err, task){
       if (err) throw err;
       res.json(task);
   })
});

router.post('/todos/post', function(req, res) {
    console.log(req.body);
    var receivedData = req.body;
    taskSchema.findById(receivedData._id, function(err, task) {
        if (err) throw err;
        task.complete = receivedData.complete;
        task.save(function(err){
            if (err) throw err;
            res.sendStatus(200)
        })
    })

    });

router.delete('/todos/:todo_id', function(req, res) {

    //var results = [];

    // Grab data from the URL parameters
    console.log(req.body);
    var id = req.params.todo_id;
    taskSchema.findByIdAndRemove(id, function (err,task) {
        if (err) throw err;
    });
    res.sendStatus(200);
});


module.exports = router;