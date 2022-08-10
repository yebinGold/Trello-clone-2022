import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging: boolean}>`
  background-color: ${(props) => props.isDragging ? '#74b9ff' : props.theme.cardColor};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: ${props => props.isDragging ? "0px 2px 10px rgba(0, 0, 0, 0.2)" : 'none'};
`;

interface IDraggableCard {
  todoId: number;
  todoText: string;
  idx: number;
}

const DraggableCard = ({ todoId, todoText, idx }: IDraggableCard) => {
  return (
    <Draggable draggableId={todoId+''} index={idx}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);
