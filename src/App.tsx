import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { todosState } from "./atoms";
import Board from "./components/Board";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const Icon = styled.span`
  font-weight: 700;
  border: 2px solid whitesmoke;
  border-radius: 35px;
  background-color: rgba(225, 225, 225, 0.7);
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: aliceblue;
  }
`;
const PlusIcon = styled(Icon)`
  position: absolute;
  right: -15%;
  color: #02ca2a;
  font-size: 48px;
  font-weight: 700;
  margin-left: 20px;
  padding: 6px 10px;
`;
const RemoveIcon = styled(Icon)<{isDraggingFrom: boolean}>`
  font-size: 32px;
  position: fixed;
  bottom: 5%;
  left: 48%;
  color: tomato;
  padding: 13px 15px;
  background-color: ${props => props.isDraggingFrom ? 'aliceblue' : 'rgba(225, 225, 225, 0.7)'};
`;

function App() {
  const [todos, setTodos] = useRecoilState(todosState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    if (destination.droppableId === "remove") {
      setTodos((prev) => {
        const boardCopy = [...prev[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {
          ...prev,
          [source.droppableId]: boardCopy,
        };
      });
      return;
    }

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
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(todos).map((boardId) => (
              <Board todos={todos[boardId]} boardId={boardId} key={boardId} />
            ))}
          </Boards>
          <PlusIcon>
            <FontAwesomeIcon icon={faPlus} />
          </PlusIcon>
        </Wrapper>
        <Droppable droppableId="remove">
          {(provided, snapshot) => (
            <RemoveIcon
              isDraggingFrom={Boolean(snapshot.draggingFromThisWith)}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </RemoveIcon>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default App;
