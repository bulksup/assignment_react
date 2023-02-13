import { React, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import PostTitle from "../components/PostTitle";
import PostButton from "../components/PostButton";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  flex-wrap: wrap;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 20%;
  margin: 0;
  padding: 0;
  justify-content: space-between;
`;

const Home = () => {
  const navigate = useNavigate();
  const [Board, setBoard] = useState([]);

  const _getAllBoard = async () => {
    try {
      fetch(`http://localhost:3000/boards`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(JSON.stringify(data));
          setBoard(data.reverse());
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _getBoardById = async (id) => {
    try {
      fetch(`http://localhost:3000/boards/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(JSON.stringify(data));
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    _getAllBoard();
  }, []);

  const _moveToRead = (id, title, writer, description, createAt, password) => {
    navigate("/read", {
      state: {
        id: id,
        title: title,
        writer: writer,
        description: description,
        createAt: createAt,
        password: password,
      },
    });
  };
  return (
    <Container>
      <Row>
        <h1>게시판</h1>
        <PostButton />
      </Row>
      <PostTitle
        id={"게시물번호"}
        title={"제목"}
        writer={"글쓴이"}
        createAt={"작성시간"}
        likes={"좋아요"}
      />
      {Board.reverse().map((item) => {
        return (
          <Post
            key={item?.id}
            id={item?.id}
            title={item?.title}
            writer={item?.writer}
            createAt={item?.createAt}
            likes={item?.likes}
            onClick={() => {
              _moveToRead(
                item?.id,
                item?.title,
                item?.writer,
                item?.description,
                item?.createAt,
                item?.password
              );
            }}
          />
        );
      })}
    </Container>
  );
};

export default Home;
