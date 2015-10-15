/**
 * Created by Nick on 10/15/15.
 */
var app = angular.module("todoApp", []);

app.controller("MainController", ['$scope', '$http', function($scope, $http){

    $scope.taskData = [];

    $scope.createTask = function(){
        //var formData = $scope.newTodo + "&complete=false";
        console.log($scope.newTodo.text);
        $scope.newTodo.complete = false;
        console.log($scope.newTodo);
        $http.post("/api/todos", $scope.newTodo).then(function (response){
            $scope.taskData = response.data;
            console.log(response.data);
        })
    };

    $scope.getData = function(){
        $http.get("/api/todos").then(function (response){
            $scope.taskData = response.data;
            console.log($scope.taskData);
        })
    };

    $scope.deleteMe = function(id,event){
        event.stopImmediatePropagation();
        console.log(id);
        $http.delete("/api/todos/" + id).then(function (){
            //$scope.taskData = response.data
            $scope.getData();
        })
    };

    $scope.markDone = function(task) {
        console.log("markDone is running");
        task.complete = !task.complete;
        $http.post("/api/todos/post", task).then(function(){
            $scope.getData();
        })
    };



    $scope.getData();
}]);