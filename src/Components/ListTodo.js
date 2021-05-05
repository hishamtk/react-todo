import Todo from "./Todo";

function ListTodo({ todos, deleteTodo }) {
  return (
    <div className="mx-auto container mt-20 h-screen">
      <div className="flex flex-col">
        {todos.map((todo) => {
          return <Todo todo={todo} deleteTodo={deleteTodo} />;
        })}
      </div>
    </div>
  );
}

export default ListTodo;
