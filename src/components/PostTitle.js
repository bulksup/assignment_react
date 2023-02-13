import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 1px solid black;
  margin: 0;
  padding: 0;
  justify-content: space-between;
`;

const PostNumber = styled.div`
  width: 10%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: bold;
`;

const Title = styled.div`
  height: 100%;
  width: 50%;
  margin: 0;
  padding: 0;
  text-align: center;
  align-items: center;
  justify-items: center;
  font-weight: bold;
`;


const Writer = styled.div`
  height: 100%;
  width: 10%;
  margin: 0;
  padding: 0;
  text-align: center;
  align-items: center;
  justify-items: center;
  font-weight: bold;
`;

const CreateAt = styled.div`
  width: 20%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  align-items: center;
  justify-items: center;
  font-weight: bold;
`;

const Likes = styled.div`
  width: 10%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  align-items: center;
  justify-items: center;
  font-weight: bold;
`;

const PostTitle = ({ id, title, writer, createAt, likes }) => {
  return (
    <Row>
      <PostNumber>{id}</PostNumber>
      <Title>{title}</Title>
      <Writer>{writer}</Writer>
      <CreateAt>{createAt}</CreateAt>
      <Likes>{likes}</Likes>
    </Row>
  );
};

export default PostTitle;
