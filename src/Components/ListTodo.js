import Todo from "./Todo";

function ListTodo({ todos, deleteTodo, makeEditable ,saveChange }) {
  return (
    <div className="mx-auto container mt-20">
      <div className="flex flex-col">
        {todos.map((todo) => {
          return <Todo todo={todo} deleteTodo={deleteTodo} makeEditable={makeEditable} saveChange={saveChange} />;
        })}
      </div>
    </div>
  );
}

export default ListTodo;
