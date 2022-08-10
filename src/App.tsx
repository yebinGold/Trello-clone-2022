import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todosState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

function App() {
  const [todos, setTodos] = useRecoilState(todosState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      setTodos((prev) => {
        const boardCopy = [...prev[source.droppableId]];
        const target = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, target);
        return {
          ...prev,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      setTodos((prev) => {
        const sourceCopy = [...prev[source.droppableId]];
        const target = sourceCopy[source.index];
        const destCopy = [...prev[destination.droppableId]];
        sourceCopy.splice(source.index, 1);
        destCopy.splice(destination?.index, 0, target);
        return {
          ...prev,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destCopy,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board todos={todos[boardId]} boardId={boardId} key={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
