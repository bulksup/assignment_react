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
  margin: 0;
  padding: 0;
  background-color: white;
  border-radius: 10px;
`;

const EditButton = ({ onClick }) => {
  return <Button onClick={() => onClick()}>수정하기</Button>;
};

export default EditButton;
