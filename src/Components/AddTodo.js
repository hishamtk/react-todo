import ListTodo from "./ListTodo";

function AddTodo({todos}) {
  return (
    <div className="container mx-auto p-4 md:w-3/5 w-4/5">
      <form>
        <label
          class="block tracking-wide text-gray-700 text-xl font-bold mb-2"
          for="todo"
        >
          Todo List
        </label>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="What do you need to do today?"
            name="todo"
          />
          <button
            className="flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-teal-500 hover:border-teal-700 text-lg text-white py-2 px-3 rounded"
            type="button"
          >
            Add Todo
          </button>
        </div>
      </form>
      <ListTodo todos={todos} />
    </div>
  );
}

export default AddTodo;
