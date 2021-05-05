import Todo from "./Todo";

function ListTodo(props) {
  return (
    <div className="mx-auto container mt-20">
      <div className="flex flex-col">
        <Todo />
        <Todo />
        <Todo />
      </div>
    </div>
  );
}

export default ListTodo;
