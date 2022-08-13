import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, todosState } from "./../atoms";
import { useSetRecoilState } from "recoil";

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
  todos: ITodo[];
  boardId: string;
}

interface IForm {
  todo: string;
}

const Board = ({ todos, boardId }: IBoard) => {
  const setTodos = useSetRecoilState(todosState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ todo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
    };
    setTodos((prev) => {
      return {
        ...prev,
        [boardId]: [newTodo, ...prev[boardId]],
      };
    });
    setValue("todo", "");
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
            {todos.map((todo, idx) => (
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
