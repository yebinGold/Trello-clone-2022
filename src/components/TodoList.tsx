import { useRecoilState, useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import { todoSelector, categoryState, Categories } from "../atoms";
import Todo from "./Todo";

const ToDoList = () => {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (e:React.FormEvent<HTMLSelectElement>) => setCategory(e.currentTarget.value as any);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateTodo />
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} /> //todo 타입과 props 인터페이스가 같기 때문에 걍 바로 spread
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
