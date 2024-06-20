"use server"

import { connectToDatabase } from '../mongoose.js';
import Todo from '../models/todo.model.js';

// CRUD actions
// read
export const getTodos = async () => {
  await connectToDatabase();
  const todos = await Todo.find({});
  return JSON.parse(JSON.stringify(todos));
};

// create
export const addTodo = async (title) => {
  await connectToDatabase();
  const newTodo = await Todo.create({ title });
  return JSON.parse(JSON.stringify(newTodo));
};

// delete
export const deleteTodo = async (id) => {
  await connectToDatabase();
  await Todo.findByIdAndDelete(id);
};

// update
export const updateTodo = async (id, updates) => {
  await connectToDatabase();
  const updatedTodo = await Todo.findByIdAndUpdate(id, updates, { new: true });
  return JSON.parse(JSON.stringify(updatedTodo));
};