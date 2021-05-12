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
  const [pageTodo, setPageTodo] = useState([]); // show specific todo according to pagination
  const [currPage, setCurrPage] = useState(1); // pagination to show the curr page
  const [pages, setPages] = useState(0); // to track how many pages needed in pagination
  const perPage = 10;

  useEffect(() => {
    getTodoApi();
  }, []);

  useEffect(() => {
    const showTodo = () => {
      if (currPage < 1 || currPage > pages) {
        return;
      }

      setPageTodo(todos.slice((currPage - 1) * perPage, currPage * perPage));
    };
    showTodo(currPage);
  }, [currPage, pages, todos]);

  useEffect(() => {
    const calcPages = (arr, perPage) => {
      let total = pages;
      let newPages = Math.ceil(arr.length / perPage);
      setPages(newPages);
      if (total > newPages && newPages > 0) {
        setCurrPage(newPages);
      }
    };
    calcPages(todos, perPage);
  }, [pages, todos]);

  const addTodo = (newTodo) => {
    if (newTodo === "") {
      return handleAlert("Todo should not be empty");
    }
    let ts = Date.now();
    // setTodos(
    //   todos.concat({ title: newTodo, id: ts, completed: false, edit: false }) // to add to last
    // );
    let newTodos = [
      { title: newTodo, id: ts, completed: false, edit: false },
    ].concat(todos);
    setTodos(newTodos);

    localStorage.setItem("todo", JSON.stringify(newTodos));
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

        let data = res.slice(0, 15); // get first 15 items
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
      <div className="container mx-auto p-4 md:w-3/5 w-4/5 ">
        <Alert alert={alert} />
        <AddTodo addTodo={addTodo} />

        <ListTodo
          todos={pageTodo}
          deleteTodo={deleteTodo}
          makeEditable={makeEditable}
          saveChange={saveChange}
        />

        <Pagination
          pages={pages}
          currPage={currPage}
          perPage={perPage}
          setCurrPage={setCurrPage}
          total={todos.length}
        />
      </div>

      <Footer />
    </div>
  );
};

export default App;
