import Todo from "./Todo";

function ListTodo({ todos }) {
  return (
    <div className="mx-auto container mt-20">
      <div className="flex flex-col">
        {todos.map((todo) => {
          return <Todo todo={todo.title} />;
        })}
      </div>
    </div>
  );
}

export default ListTodo;
