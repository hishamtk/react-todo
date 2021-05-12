import React, { useState } from "react";

function AddTodo({ addTodo }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        className="block tracking-wide text-gray-700 text-xl font-bold mb-2"
        htmlFor="todo"
      >
        Todo List
      </label>
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          value={text}
          placeholder="What do you need to do today?"
          name="todo"
          onChange={handleChange}
        />
        <button
          className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-teal-500 hover:border-teal-700 text-lg text-white py-2 px-3 rounded"
          type="submit"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}

export default AddTodo;
