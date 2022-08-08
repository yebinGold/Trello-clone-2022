import { useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import { todoState } from "../atoms";
import Todo from "./Todo";


const ToDoList = () => {
  const todos = useRecoilValue(todoState);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateTodo/>
      <ul>
        {todos.map(todo => <Todo key={todo.id} {...todo} />)} {/* todo 타입과 props 인터페이스가 같기 때문에 걍 바로 spread */}
      </ul>
    </div>
  );
};

export default ToDoList;
