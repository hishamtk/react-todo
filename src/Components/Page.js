import React from "react";

const Page = ({ number, showTodo }) => {
  return (
    <button
      onClick={() => {
        showTodo(number);
      }}
      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {number}
    </button>
  );
};
export default Page;
