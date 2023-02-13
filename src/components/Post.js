import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 0.5px solid black;
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
`;

const Title = styled.div`
  height: 100%;
  width: 50%;
  margin: 0;
  padding: 0;
  text-align: center;
  align-items: center;
  justify-items: center;
`;

const Writer = styled.div`
  height: 100%;
  width: 10%;
  margin: 0;
  padding: 0;
  text-align: center;
  align-items: center;
  justify-items: center;
`;

const CreateAt = styled.div`
  width: 20%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  align-items: center;
  justify-items: center;
`;

const Likes = styled.div`
  width: 10%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  align-items: center;
  justify-items: center;
`;

const Post = ({ id, title, writer, createAt, likes, onClick }) => {
  const sentTime = new Date(createAt) / 1000;
  const currentTime = new Date() / 1000;
  const timeGap = currentTime - sentTime;

  let gap;
  if (timeGap < 60) {
    gap = "방금 전";
  }
  if (timeGap > 60 && timeGap < 3600) {
    gap = Math.round(timeGap / 60) + "분 전";
  }
  if (timeGap > 3600 && timeGap < 86400) {
    gap = Math.round(timeGap / 3600) + "시간 전";
  }
  if (timeGap > 86400 && timeGap < 604800) {
    gap = Math.round(timeGap / 86400) + "일 전";
  }

  return (
    <Row>
      <PostNumber>{id}</PostNumber>
      <Title onClick={onClick}>{title}</Title>
      <Writer>{writer}</Writer>
      <CreateAt>{gap}</CreateAt>
      <Likes>{likes}</Likes>
    </Row>
  );
};

export default Post;
