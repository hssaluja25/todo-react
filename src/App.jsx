import { useState, useEffect } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id, completed) {
    // For the todo with id, change the completed to the opposite of checked
    setTodos((crtTodos) => {
      return crtTodos.map((todo) => {
        if (todo.id === id) {
          // Warning: The following would not work. This is because state is IMMUTABLE so if you want to change, make sure you are creating a brand new state
          // todo.completed = completed;
          // Note that spread can take place for an object too
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((crtTodos) => {
      return crtTodos.filter((todo) => todo.id !== id);
    });
  }

  function addTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
