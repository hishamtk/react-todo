import React, { Component } from "react";

import Footer from "./Components/Footer";
import AddTodo from "./Components/AddTodo";
import Navbar from "./Components/Navbar";

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

  render() {
    return (
      <div>
        <Navbar />
        <AddTodo todos={this.state.todos} />

        <Footer />
      </div>
    );
  }
}

export default App;
