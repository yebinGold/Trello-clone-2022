import React from "react";
import { ITodo } from "./../atoms";

const Todo = ({ text }: ITodo) => {
  return (
    <li>
      {text} 
      <button>To Do</button>
      <button>Doing</button>
      <button>Done</button>
    </li>
  );
};

export default Todo;
