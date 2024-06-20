'use client';

import { useState, useEffect } from 'react';
import { getTodos, addTodo, deleteTodo, updateTodo } from '../database/actions/todo.actions'

export default function Home() {
  const [todos, setTodos] = useState([
    // {
    //   title: "adsf;lkjaslkfdjas;lkdfjsa;lkdj;lkfdsalk",
    //   completed: false
    // },
    // {
    //   title: "asdf;lkjdsalkfj;salkdf",
    //   completed: true
    // }
  ]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    const todo = await addTodo(newTodo);
    setTodos([...todos, todo]);
    setNewTodo('');
  };

  const handleDeleteTodo = async (id) => {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleToggleComplete = async (todo) => {
    const updatedTodo = await updateTodo(todo._id, { ...todo, completed: !todo.completed });
    setTodos(todos.map(curTodo => curTodo._id === todo._id ? updatedTodo : curTodo));
  };

  return (
    <div className="flex flex-col h-screen w-full items-center p-5 gap-5 text-white bg-gray-900">
      <div className="text-5xl font-bold">Todo List</div>

      <div className="bg-gray-800 w-full h-full rounded-lg p-5 flex flex-col gap-4 shadow-lg">
        {todos.map((todo) => (
          <div key={todo._id} className="bg-gray-700 flex flex-row items-center p-3 gap-3 rounded-lg shadow-md">
            <div
              className={`flex-grow text-lg ${todo.completed ? "line-through text-gray-400" : "text-white"
                }`}
            >
              {todo.title}
            </div>
            <button
              className="bg-blue-500 w-[130px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleToggleComplete(todo)}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDeleteTodo(todo._id)}
            >
              Delete
            </button>
          </div>
        ))}

        <div className="flex flex-row p-3 bg-gray-700 w-full gap-3 rounded-lg shadow-md">
          <input
            className="flex-grow p-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>

  );
}
