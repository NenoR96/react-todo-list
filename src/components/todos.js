import React, { Component } from 'react'

class Todos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: '',
      todos: [],
      editing: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ todo: event.target.value });
  }

  handleSubmit(event) {
    var edit = this.state.editing;
    let todo = this.state.todo;
        console.log(todo);
    if(edit === false) {
      fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify({ todo }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(json => console.log(json))
    

      this.setState({
        todos: [...this.state.todos, this.state.todo],
        todo: ""
      })
    }
    else if(edit === true) {
      console.log("edituje ");
      var todos = [...this.state.todos];
      var index = todos.findIndex(obj => obj.id === id);
      todos[index].todo = todo;
      this.setState({todos});
    }
    event.preventDefault();
  }

  deleteTodo(index) {
    this.setState({
        todos: this.state.todos.filter((_, i) => i !== index)
    })
    console.log(index);
  }

  editTodo(index) {
    let zauradit = this.state.todos[index];
    this.setState({
      todo: zauradit,
      editing: true
    })
  }

  render() {
    let todos = this.state.todos;
    console.log(todos);
    return (
      <div>
        {todos.map((todo, i) =>
        <div key={i}>
            {todo} {i} <button onClick={this.editTodo.bind(this, i)}>Edit</button> <button onClick={this.deleteTodo.bind(this, i)}>X</button>
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