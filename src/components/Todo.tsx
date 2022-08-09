import React from "react";
import { Categories, ITodo, todoState } from "./../atoms";
import { useSetRecoilState } from "recoil";

const Todo = ({ text, category, id }: ITodo) => {
  const setTodos = useSetRecoilState(todoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { text, id, category: name as any };
        }
        return todo;
      });
    });
  };
  const onRemove = () => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  return (
    <li>
      {text}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      <button onClick={onRemove}>Delete</button>
    </li>
  );
};

export default Todo;
