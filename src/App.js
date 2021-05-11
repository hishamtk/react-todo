import React, { useEffect, useState } from "react";

import AddTodo from "./Components/AddTodo";
import Alert from "./Components/Alert";
import Footer from "./Components/Footer";
import ListTodo from "./Components/ListTodo";
import Navbar from "./Components/Navbar";
import Pagination from "./Components/Pagination";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [pageTodo, setPageTodo] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const perPage = 20;

  useEffect(() => {
    getTodoApi();
  }, []);

  const showTodo = (pageNo) => {
    if (pageNo < 1) {
      return;
    }
    console.log(todos);
    setPageTodo(todos.slice((pageNo - 1) * perPage, pageNo * perPage));
  };

  const addTodo = (newTodo) => {
    if (newTodo === "") {
      return handleAlert("Todo should not be empty");
    }
    let ts = Date.now();
    setTodos([
      { title: newTodo, id: ts, completed: false, edit: false },
      ...todos,
    ]);
    // setTodos(
    //   [{ title: newTodo, id: ts, completed: false, edit: false }].concat(todos)
    // );

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
        let res = response.json();

        let data = res; //.slice(0, 5); // get first 5 items
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

    showTodo(2);
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
          todos={pageTodo}
          deleteTodo={deleteTodo}
          makeEditable={makeEditable}
          saveChange={saveChange}
        />

        <Pagination />
      </div>

      <Footer />
    </div>
  );
};

export default App;
