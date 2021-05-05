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

      this.setState({ todos: data });
    } catch (error) {
      console.error("Api call error", error);
    }
  };

  componentDidMount = () => {
    this.getTodoApi();
  };

  deleteTodo = (id) => {
    let todos = this.state.todos;
    let newTodo = todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({ todos: newTodo });
  };

  addTodo = (todo) => {

    let ts = Date.now();
    console.log(ts, todo);
    this.setState({
      todos: this.state.todos.concat({ title: todo, id: ts, completed: false }),
    });

 
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto p-4 md:w-3/5 w-4/5">
          <AddTodo addTodo={this.addTodo} />

          <ListTodo todos={this.state.todos} deleteTodo={this.deleteTodo} />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
