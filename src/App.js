import React, { useEffect, useState } from "react";

import AddTodo from "./Components/AddTodo";
import Alert from "./Components/Alert";
import Footer from "./Components/Footer";
import ListTodo from "./Components/ListTodo";
import Navbar from "./Components/Navbar";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    getTodoApi();
  }, []);

  const addTodo = (newTodo) => {
    if (newTodo === "") {
      return handleAlert("Todo should not be empty");
    }
    let ts = Date.now();

    setTodos(
      todos.concat({ title: newTodo, id: ts, completed: false, edit: false })
    );

    localStorage.setItem("todo", JSON.stringify(todos));
  };

  const deleteTodo = (id) => {
    let newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(newTodos);
    localStorage.setItem("todo", JSON.stringify(newTodos));
  };

  const getTodoApi = async () => {
    const cacheTodo = localStorage.getItem("todo");

    if (cacheTodo !== null) {
      setTodos(JSON.parse(cacheTodo));
    } else {
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        let res = await response.json();

        let data = res.slice(0, 5); // get first 5 items
        data = data.map((item) => {
          item.edit = false;
          return item;
        });
        setTodos(data);

        localStorage.setItem("todo", JSON.stringify(data));
      } catch (error) {
        console.error("Api call error", error);
      }
    }
  };

  const handleAlert = (msg) => {
    setAlert(msg);

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const makeEditable = (id) => {
    let newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.edit = true;
      }
      return todo;
    });
    setTodos(newTodo);

    localStorage.setItem("todo", JSON.stringify(newTodo));
  };

  const saveChange = (text, id) => {
    if (text === "") {
      return handleAlert("Todo should not be empty");
    }

    let newTodo = todos.map((todo) => {
      if (todo.id === id && todo.edit === true) {
        todo.title = text;
        todo.edit = false;
      }
      return todo;
    });
    setTodos(newTodo);

    localStorage.setItem("todo", JSON.stringify(newTodo));
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 md:w-3/5 w-4/5">
        <Alert alert={alert} />
        <AddTodo addTodo={addTodo} />

        <ListTodo
          todos={todos}
          deleteTodo={deleteTodo}
          makeEditable={makeEditable}
          saveChange={saveChange}
        />
      </div>

      <Footer />
    </div>
  );
};

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { todos: [], alert: null };
//   }

//   getTodoApi = async () => {
//     const cacheTodo = localStorage.getItem("todo");
//     console.log(JSON.parse(cacheTodo));
//     if (cacheTodo !== null) {
//       this.setState({ todos: JSON.parse(cacheTodo) });
//     } else {
//       try {
//         let response = await fetch(
//           "https://jsonplaceholder.typicode.com/todos"
//         );
//         let res = await response.json();

//         // let data = res.filter((todo) => {
//         //   return todo.userId === 1;  // to get first user data
//         // });

//         let data = res.slice(0, 5); // get first 5 items
//         data = data.map((item) => {
//           item.edit = false;
//           return item;
//         });

//         this.setState({ todos: data });
//         localStorage.setItem("todo", JSON.stringify(data));
//       } catch (error) {
//         console.error("Api call error", error);
//       }
//     }
//   };

//   componentDidMount = () => {
//     this.getTodoApi();
//   };

//   addTodo = (todo) => {
//     if (todo === "") {
//       return this.handleAlert("Todo should not be empty");
//     }
//     let ts = Date.now();
//     console.log(ts, todo);
//     this.setState({
//       todos: this.state.todos.concat({
//         title: todo,
//         id: ts,
//         completed: false,
//         edit: false,
//       }),
//     });
//     localStorage.setItem("todo", JSON.stringify(this.state.todos));
//   };

//   deleteTodo = (id) => {
//     let todos = this.state.todos;
//     let newTodo = todos.filter((todo) => {
//       return todo.id !== id;
//     });
//     this.setState({ todos: newTodo });
//     localStorage.setItem("todo", JSON.stringify(newTodo));
//   };

//   makeEditable = (id) => {
//     let todos = this.state.todos;
//     let newTodo = todos.map((todo) => {
//       if (todo.id === id) {
//         todo.edit = true;
//       }
//       return todo;
//     });
//     this.setState({ todo: newTodo });
//     localStorage.setItem("todo", JSON.stringify(newTodo));
//   };

//   saveChange = (text, id) => {
//     if (text === "") {
//       return this.handleAlert("Todo should not be empty");
//     }
//     let todos = this.state.todos;
//     let newTodo = todos.map((todo) => {
//       if (todo.id === id && todo.edit === true) {
//         todo.title = text;
//         todo.edit = false;
//       }
//       return todo;
//     });
//     this.setState({ todo: newTodo });
//     localStorage.setItem("todo", JSON.stringify(newTodo));
//   };

//   handleAlert = (msg) => {
//     this.setState({ alert: msg });
//     setTimeout(() => {
//       this.setState({ alert: null });
//     }, 5000);
//   };

//   render() {
//     return (
//       <div>
//         <Navbar />
//         <div className="container mx-auto p-4 md:w-3/5 w-4/5">
//           <Alert alert={this.state.alert} />
//           <AddTodo addTodo={this.addTodo} />

//           <ListTodo
//             todos={this.state.todos}
//             deleteTodo={this.deleteTodo}
//             makeEditable={this.makeEditable}
//             saveChange={this.saveChange}
//           />
//         </div>

//         <Footer />
//       </div>
//     );
//   }
// }

export default App;
