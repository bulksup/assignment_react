import { React, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import FinishPostButton from "../components/FinishPostButton";
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

const TitleInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 1px solid black;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  margin-bottom: 15px;
  padding: 0;
  justify-content: space-between;
  font-size: 18px;
`;

const Input = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 40%;
  height: 30px;
  border: 1px solid black;
  border-left: 0;
  border-right: 0;
  border-top: 0;
  margin-bottom: 15px;
  margin-right: 10px;
  padding: 0;
  justify-content: space-between;
  font-size: 18px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  margin: 0;
  padding: 0;
  margin-bottom: 15px;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  margin-bottom: 15px;
  justify-content: space-between;
`;


const Edit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const [title, setTitle] = useState(location.state.title);
  const [description, setDescription] = useState(location.state.description);
  const [writer, setWriter] = useState(location.state.writer);
  const [password, setPassword] = useState(location.state.password);
  const createAt = location.state.createAt;

  const _handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const _handleChangeWriter = (e) => {
    setWriter(e.target.value);
  };

  const _handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const _editBoard = async (id) => {
    try {
      fetch(`http://localhost:3000/boards/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify({
          title: title,
          description: description,
          password: password,
          writer: writer,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const _moveToHome = () => {
    navigate("/");
  };

  const _clickfinishEditButton = (id) => {
    _editBoard(id);
    _moveToHome();
  };

  return (
    <Container>
      <h2>게시판</h2>
      <Row>
        <Column>
          <Input
            value={writer}
            placeholder="이름을 입력해주세요 !"
            onChange={_handleChangeWriter}
          />
          <Input
            value={password}
            placeholder="비밀번호를 입력해주세요 !"
            onChange={_handleChangePassword}
          />
        </Column>
        <FinishPostButton onClick={_clickfinishEditButton} id={id} />
      </Row>
      <TitleInput
        value={title}
        placeholder="제목을 입력해주세요 !"
        onChange={_handleChangeTitle}
      />
      <CKEditor
        editor={ClassicEditor}
        data={description}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          setDescription(editor.getData());
          console.log({ event, editor, description });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </Container>
  );
};

export default Edit;
