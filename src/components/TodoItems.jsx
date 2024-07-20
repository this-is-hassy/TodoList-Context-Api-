import React from "react";
import { useTodo } from "../contexts/index";
import { useState } from "react";

const TodoItems = ({ todo }) => {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, completeTodo, deleteTodo } = useTodo();

  const editTodo = () => {
    if (!todoMsg) {
      return alert("Please enter any Todo");
    } else updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };
  return (
    <>
      <div
      className={`flex border border-black/10 rounded-lg px-4 py-3 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => completeTodo(todo.id)}
      />
      <input
        type="text"
        className={`border outline-none w-full text-2xl font-semibold bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg( e.target.value)}
        readOnly={!isTodoEditable}
      />
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable((prev) => !prev);
          }
        }}
        disabled={todo.completed}

      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          deleteTodo(todo.id);
        }}
      >
        ❌
      </button>
      </div>
    </>
  );
};

export default TodoItems;
