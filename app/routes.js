var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getTodoById(res, id) {
    Todo.findById(id, function(err, todo) {
      if (err) {
        res.send(err);
      }
  
      res.json(todo); // return the todo in JSON format
    });
}

function getTodosFormatted(res, format) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
            return;
        }
        
        switch (format) {
            case 'txt':
                // Return todos as a string in plain text format
                var output = "";
                todos.forEach(function (todo) {
                    output += "ID: " + todo._id + "\n";
                    output += "Title: " + todo.text + "\n";
                });
                res.send(output);
                break;

            case 'table':
                // Return todos in a formatted HTML table
                var output = "<table>";
                output += "<tr><th>ID</th><th>Title</th><th>Completed</th></tr>";
                todos.forEach(function (todo) {
                    output += "<tr>";
                    output += "<td>" + todo._id + "</td>";
                    output += "<td>" + todo.text + "</td>";
                    output += "</tr>";
                });
                output += "</table>";
                res.send(output);
                break;

            case 'json':
                // Return todos in JSON format by default
                var output = JSON.stringify(todos);
                res.send(output);
                break;

            default:
                res.send("Option not implemented: " + format)
                break;
        }
    });
  }

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // get single todo
    app.get('/api/todos/:id', function (req, res) {
        // use mongoose to get all todos in the database
        getTodoById(res, req.params.id);
    });

    // get all todos formatted
    app.get('/api/todos/formatted/:format', function (req, res) {
        // use mongoose to get all todos in the database
        getTodosFormatted(res, req.params.format);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // create todo and send it back
    app.post('/api/todos/create', function (req, res) {
        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            res.send(todo);
        });

    });

    // create random number of todos between 10 and 100
    app.post('/api/todos/random', function (req, res) {
        // generate random number with our custom method
        const randomNum = getRandomNumber(10, 100);

        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();

        // format the date
        const dateString = `${day}/${month}/${year}`;
        for (let index = 0; index < randomNum; index++) {
            Todo.create({
                text: 'Random ' + (index + 1) + ' ToDo created at ' + dateString,
                done: false
            }, function (err, todo) {
                if (err)
                    res.send(err);
            });
        }
        getTodos(res);
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // delete all todos
    app.delete('/api/todos', function (req, res) {
        Todo.deleteMany({}, function (err) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};