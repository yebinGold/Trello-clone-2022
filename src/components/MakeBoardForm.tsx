import React from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { boardInputState } from "../atoms";
import { todosState } from "./../atoms";

const Form = styled.form`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  height: 100px;
  position: fixed;
  z-index: 100;
  top: 0px;
  display: flex;
  justify-content: center;
  padding: 50px 0;
`;

const BoardNameInput = styled.input`
  width: 300px;
  height: 50px;
  padding: 10px 13px;
  border: 2px solid whitesmoke;
  border-radius: 25px;
  background-color: rgba(225, 225, 225, 0.7);
  outline: none;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: aliceblue;
  }
  &:focus {
    background-color: aliceblue;
  }
`;

const MakeBoardForm = () => {
  const [name, setName] = useRecoilState(boardInputState);
  const setTodos = useSetRecoilState(todosState);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prev) => {
      return {
        ...prev,
        [name]: [],
      };
    });
    setName("");
  };
  return (
    <Form onSubmit={onSubmit}>
      <BoardNameInput
        value={name}
        onChange={onChange}
        placeholder="Create a new board"
      />
    </Form>
  );
};

export default MakeBoardForm;
