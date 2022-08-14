import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, todosState } from "./../atoms";
import { useRecoilState } from "recoil";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 20px 0px;
  border-radius: 3px;
  min-height: 300px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 800;
`;

interface IArea {
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
}

const Area = styled.div<IArea>`
  // drop 인식 영역
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFrom
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;
const EachBoard = styled.div`
`;

const Form = styled.form`
  width: 100%;
  padding: 0 20px;
  input {
    width: 100%;
    outline: none;
    border: none;
    padding: 5px 7px;
  }
`;

interface IBoard {
  boardTodos: ITodo[];
  boardId: string;
}

interface IForm {
  todo: string;
}

const Board = ({ boardTodos, boardId }: IBoard) => {
  const [todos, setTodos] = useRecoilState(todosState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
    };
    let newList = [] as ITodo[];
    setTodos((prev) => {
      newList = [newTodo, ...prev[boardId]];
      return {
        ...prev,
        [boardId]: newList,
      };
    });
    setValue("todo", "");

    // 배열 업데이트
    setTimeout(() => {
      localStorage.setItem(boardId, JSON.stringify(newList));
    }, 0);
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("todo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
           <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFrom={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boardTodos.map((todo, idx) => (
              <DraggableCard
                key={todo.id}
                todoId={todo.id}
                todoText={todo.text}
                idx={idx}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
