import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RemoveWrapper = styled.div`
  width: 100%;
  height: 10%;
  background-color: ${(props) => props.theme.bgColor};
  position: fixed;
  z-index: 100;
  bottom: 0px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;
const RemoveIcon = styled.span<{ isDraggingover: boolean }>`
  font-size: 32px;
  color: tomato;
  font-weight: 700;
  border: 2px solid whitesmoke;
  border-radius: 35px;
  background-color: rgba(225, 225, 225, 0.7);
  padding: 13px 15px;
  background-color: ${(props) =>
    props.isDraggingover ? "aliceblue" : "rgba(225, 225, 225, 0.7)"};
  transform: ${(props) => (props.isDraggingover ? "scale(1.2)" : "none")};
  transition: all 0.2s ease-in-out;
`;

const RemoveBlock = () => {
  return (
    <Droppable droppableId="remove">
      {(provided, snapshot) => (
        <RemoveWrapper ref={provided.innerRef} {...provided.droppableProps}>
          <RemoveIcon isDraggingover={Boolean(snapshot.draggingOverWith)}>
            <FontAwesomeIcon icon={faTrashCan} />
          </RemoveIcon>
          {provided.placeholder}
        </RemoveWrapper>
      )}
    </Droppable>
  );
};

export default RemoveBlock;
