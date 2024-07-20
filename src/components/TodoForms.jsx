import { useState } from "react";
import { useTodo } from "../contexts/index";

function TodoForm() {
  const [todo, setTodo] = useState("");
  let { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return alert("Please enter any Todo");
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-full border-2 border-black/10 rounded-l-lg px-6 outline-none text-2xl font-bold duration-150 bg-white/20 py-4"
      />
      <button
        type="submit"
        className="rounded-r-lg px-8 text-3xl font-semibold py-3 bg-gradient-to-r from-green-700 to-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
