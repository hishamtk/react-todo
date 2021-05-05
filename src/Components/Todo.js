function Todo({todo}) {
  return (
    <div className="flex flex-row items-center justify-around mb-5 border p-3">
      <div className="w-4/5 ml-8">
        <p className="text-xl">{todo}</p>
      </div>
      <button
        className="flex-shrink-0 mx-4 bg-blue-500 hover:bg-indigo-700 border-teal-500 hover:border-teal-700 text-lg text-white py-3 px-5 rounded"
        type="button"
      >
        Edit
      </button>
      <button
        className="flex-shrink-0 mx-4 bg-red-500 hover:bg-indigo-700 border-teal-500 hover:border-teal-700 text-lg text-white py-3 px-5 rounded"
        type="button"
      >
        Delete
      </button>
    </div>
  );
}

export default Todo;
