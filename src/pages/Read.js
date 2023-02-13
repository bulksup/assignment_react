import { React, useEffect, useState } from "react";
import styled from "styled-components";
import EditButton from "../components/EditButton";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  flex-wrap: wrap;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 10px;
  flex-wrap: wrap;
  border: 1px solid black;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 20%;
  margin: 0;
  padding: 0;
`;

const SpaceBetweenRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 20%;
  margin: 0;
  padding: 0;
`;

const Input = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 70%;
  height: 30px;
  border: 1px solid black;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  margin-bottom: 15px;
  margin-right: 10px;
  margin-top: 14px;
  padding: 0;
  justify-content: space-between;
  font-size: 14px;
`;

const Read = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const title = location.state.title;
  const writer = location.state.writer;
  const description = location.state.description;
  const createAt = location.state.createAt;
  const password = location.state.password;

  const [insertedPassword, setInsertedPassword] = useState("");
  const [likes, setLikes] = useState(0);

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

  const _handleChangeInsertedPassword = (e) => {
    setInsertedPassword(e.target.value);
  };

  const _moveToEdit = (id, title, writer, description, createAt, password) => {
    navigate("/edit", {
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

  const _moveToHome = () => {
    navigate("/");
  };

  const _deleteBoard = async (id) => {
    try {
      fetch(`http://localhost:3000/boards/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`${response.status} 에러발생`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .then((result) => {
          console.log("result", result);
        });
    } catch (e) {
      console.log("friend delete fail", e);
    }
  };

  const _getLikes = async (id) => {
    try {
      fetch(`http://localhost:3000/boards/likes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setLikes(data);
        });
    } catch (e) {
      console.log("friend delete fail", e);
    }
  };

  const _updateLikes = async (id) => {
    try {
      fetch(`http://localhost:3000/boards/likes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setLikes(data);
        });
    } catch (e) {
      console.log("friend delete fail", e);
    }
  };

  const _clickEditButton = () => {
    if (insertedPassword === password) {
      _moveToEdit(id, title, writer, description, createAt, password);
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };

  const _clickDeleteButton = (id) => {
    if (insertedPassword === password) {
      _deleteBoard(id);
      _moveToHome();
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };

  useEffect(() => {
    _getLikes(id);
  }, []);

  return (
    <Container>
      <SpaceBetweenRow>
        <Row>
          <h1>{title}</h1> ( by {writer}, {gap} ) ❤️ x {likes}
        </Row>
        <Input
          placeholder="수정하거나 삭제하려면, 비밀번호를 입력해주세요!"
          onChange={_handleChangeInsertedPassword}
        />
        <EditButton onClick={_clickEditButton} />
        <DeleteButton onClick={_clickDeleteButton} id={id} />
        <LikeButton onClick={_updateLikes} id={id} />
      </SpaceBetweenRow>
      <BoardContainer>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </BoardContainer>
    </Container>
  );
};

export default Read;
