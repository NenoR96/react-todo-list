import React, { Component } from 'react'

class Todos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: '',
      todos: [],
      editing: false,
      edited: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ todo: event.target.value });
  }

  componentWillMount() {
    fetch('http://localhost:3000/todos', {
      method: 'GET',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => this.setState({ todos: json }))

  }

  handleSubmit(event) {
    var editing = this.state.editing;
    let todo = this.state.todo;
    if (editing === false) {
      fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify({ todo }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(json => this.setState({
          todos: [...this.state.todos, json],
          todo: ""
        }))
    } else if (editing === true) {
      var todos = this.state.todos;
      var index = todos.findIndex(obj => obj.id === this.state.edited);
      console.log(index)
      todos[index].todo = todo;
      console.log(todos)
      fetch('http://localhost:3000/todos/' + todos[index].id,
        {
          method: 'PUT',
          body: JSON.stringify({ todo }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => response.json())
      this.setState({ todos: todos, todo: "" });
    }
    event.preventDefault();
  }

  deleteTodo(index) {
    
    fetch('http://localhost:3000/todos/' + this.state.todos[index].id,
      {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
    this.setState({
      todos: this.state.todos.filter((_, i) => i !== index)
    })
  }

  editTodo(index) {
    let todo = this.state.todos[index];
    this.setState({
      todo: todo.todo,
      editing: true,
      edited: todo.id
    })
  }

  render() {
    let todos = this.state.todos;
    return (
      <div>
        {todos.map((todo, i) =>
          <div key={i}>
            {todo.todo} {i} <button onClick={this.editTodo.bind(this, i)}>Edit</button> <button onClick={this.deleteTodo.bind(this, i)}>X</button>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <label>
            To do:
        <input type="text" value={this.state.todo} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Todos;