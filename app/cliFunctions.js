const axios = require('axios');

function getTodos() {
  const url = `http://localhost:8080/api/todos`;
  axios.get(url)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function getTodoById(id) {
  const url = `http://localhost:8080/api/todos/${id}`;
  axios.get(url)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function deleteById(id) {
  const url = `http://localhost:8080/api/todos/${id}`;
  axios.delete(url)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function deleteAll() {
  const url = `http://localhost:8080/api/todos`;
  axios.delete(url)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function getTodosFormatted(format) {
  const url = `http://localhost:8080/api/todos/formatted/${format}`;
  axios.get(url)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function addTodo(text) {
  const url = `http://localhost:8080/api/todos/create`;
  axios.post(url, text)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

function createRandomTodos() {
  const url = `http://localhost:8080/api/todos/random`;
  axios.post(url)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = {
  getTodos,
  getTodoById,
  getTodosFormatted,
  addTodo,
  createRandomTodos,
  deleteAll,
  deleteById
};