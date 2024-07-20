import { TodoContextProvider } from "./contexts/index";
import TodoForm from "./components/TodoForms";
import TodoItems from "./components/TodoItems";
import { useState, useEffect } from "react";


function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id == id ? todo : prevTodo))
    );
  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const completeTodo = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id == id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };
  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  return (
    <>
      <TodoContextProvider  
        value={{ todos, addTodo, updateTodo, deleteTodo, completeTodo }}
      >
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-5xl font-bold text-center mb-12 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-8">
              <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItems todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </TodoContextProvider>
    </>
  );
}

export default App;


