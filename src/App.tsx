import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TodoList from "./components/TodoList";

function App() {
  const onDragEnd = () => {}; // props로 전달할 함수
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="one">
            {(provided) => (
              <ul ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable draggableId="first" index={0}>
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps}>
                      <span {...provided.dragHandleProps}>👍</span>
                      one
                    </li>
                  )}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      {/* <TodoList /> */}
    </>
  );
}

export default App;
