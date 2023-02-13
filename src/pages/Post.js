import { React, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import FinishPostButton from "../components/FinishPostButton";

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
  font-size: 15px;
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
  font-size: 15px;
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

const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");

  const _handleChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const _handleChangeWriter = (e) => {
    setWriter(e.target.value);
    console.log(title);
  };

  const _handleChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(title);
  };

  const _postBoard = async () => {
    try {
      fetch("http://localhost:3000/boards", {
        method: "POST",
        headers: { "Content-Type": `application/json` },
        body: JSON.stringify({
          title: title,
          description: description,
          password: password,
          writer: writer,
        }),
      })
        .then((response) => {
          if (!response.ok) {alert("게시글 작성에 실패했습니다.");}
          return response.json();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <h2>게시판</h2>
      <Row>
        <Column>
          <Input
            placeholder="이름을 입력해주세요 !"
            onChange={_handleChangeWriter}
          />
          <Input
            placeholder="비밀번호를 입력해주세요 !"
            onChange={_handleChangePassword}
          />
        </Column>
        <FinishPostButton onClick={_postBoard} />
      </Row>
      <TitleInput
        placeholder="제목을 입력해주세요 !"
        onChange={_handleChangeTitle}
      />
      <CKEditor
        editor={ClassicEditor}
        data="<p>내용을 입력해주세요!</p>"
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

export default Post;
