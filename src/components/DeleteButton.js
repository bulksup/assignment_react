import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 40px;
  border: 0.5px solid black;
  margin-left: 10px;
  padding: 0;
  background-color: white;
  border-radius: 10px;
`;

const DeleteButton = ({ onClick, id }) => {
  return <Button onClick={() => onClick(id)}>삭제하기</Button>;
};

export default DeleteButton;
