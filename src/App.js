import React, { Component } from "react";

import Footer from "./Components/Footer";
import AddTodo from "./Components/AddTodo";
import Navbar from "./Components/Navbar";
import ListTodo from "./Components/ListTodo";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  getTodoApi = async () => {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/todos");
      let res = await response.json();

      // let data = res.filter((todo) => {
      //   return todo.userId === 1;  // to get first user data
      // });

      let data = res.slice(0, 5); // get first 5 items
      data = data.map((item) => {
        item.edit = false;
        return item;
      });

      this.setState({ todos: data });
    } catch (error) {
      console.error("Api call error", error);
    }
  };

  componentDidMount = () => {
    this.getTodoApi();
  };

  addTodo = (todo) => {
    let ts = Date.now();
    console.log(ts, todo);
    this.setState({
      todos: this.state.todos.concat({
        title: todo,
        id: ts,
        completed: false,
        edit: false,
      }),
    });
  };

  deleteTodo = (id) => {
    let todos = this.state.todos;
    let newTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({ todos: newTodo });
  };

  makeEditable = (id) => {
    let todos = this.state.todos;
    let newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.edit = true;
      }
      return todo;
    });
    this.setState({ todo: newTodo });
  };

  saveChange = (text, id) => {
    let todos = this.state.todos;
    let newTodo = todos.map((todo) => {
      if (todo.id === id && todo.edit === true) {
        todo.title = text;
        todo.edit = false;
      }
      return todo;
    });
    this.setState({ todo: newTodo });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto p-4 md:w-3/5 w-4/5">
          <AddTodo addTodo={this.addTodo} />

          <ListTodo
            todos={this.state.todos}
            deleteTodo={this.deleteTodo}
            makeEditable={this.makeEditable}
            saveChange={this.saveChange}
          />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
