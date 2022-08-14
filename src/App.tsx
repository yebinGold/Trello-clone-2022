import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { ITodoState, todosState } from "./atoms";
import Board from "./components/Board";
import { useEffect } from "react";
import MakeBoardForm from "./components/MakeBoardForm";
import RemoveBlock from "./components/RemoveBlock";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  position: relative;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px 0;
  margin-top: 30px;
`;

function App() {
  const [todos, setTodos] = useRecoilState(todosState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    let newTodos = {} as ITodoState;

    if (destination.droppableId === source.droppableId) {
      setTodos((prev) => {
        const boardCopy = [...prev[source.droppableId]];
        const target = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, target);

        newTodos = {
          ...prev,
          [source.droppableId]: boardCopy,
        };
        return newTodos;
      });
    } else {
      if (destination.droppableId === "remove") {
        setTodos((prev) => {
          const boardCopy = [...prev[source.droppableId]];
          boardCopy.splice(source.index, 1);

          newTodos = {
            ...prev,
            [source.droppableId]: boardCopy,
          };
          return newTodos;
        });
      } else {
        setTodos((prev) => {
          const sourceCopy = [...prev[source.droppableId]];
          const target = sourceCopy[source.index];
          const destCopy = [...prev[destination.droppableId]];
          sourceCopy.splice(source.index, 1);
          destCopy.splice(destination?.index, 0, target);

          newTodos = {
            ...prev,
            [source.droppableId]: sourceCopy,
            [destination.droppableId]: destCopy,
          };
          return newTodos;
        });
      }
    }

    // 전체 저장
    setTimeout(() => {
      // Object.keys(newTodos).forEach((todo) => {
      //   localStorage.setItem(todo, JSON.stringify(newTodos[todo]));
      // });
      localStorage.setItem("todoBoards", JSON.stringify(newTodos));
    }, 0);
  };

  // 로컬스토리지에 저장된 todos 불러오기
  useEffect(() => {
    const getTodos = localStorage.getItem("todoBoards");
    if (getTodos === null) return;
    
    const savedTodos = JSON.parse(getTodos);

    Object.keys(savedTodos).forEach((key) => {
      setTodos((prev) => {
        return {
          ...prev,
          [key]: savedTodos[key],
        };
      });
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("todoBoards", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <MakeBoardForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(todos).map((boardId) => (
              <Board
                boardTodos={todos[boardId]}
                boardId={boardId}
                key={boardId}
              />
            ))}
          </Boards>
        </Wrapper>
        <RemoveBlock />
      </DragDropContext>
    </>
  );
}

export default App;
