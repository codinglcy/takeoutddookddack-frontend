import "./css/Login.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axiosApi from "../Util/api";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const logShow = props.loginShow;
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState();
  const [loginPw, setLoginPw] = useState();

  const handleClose = () => {
    props.loginShowFunc(false);
  };

  return (
    <>
      <Modal show={logShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>로그인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>ID(아이디)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID"
                onChange={(e) => setLoginId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password(비밀번호)</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setLoginPw(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={() => {
              handleClose();
              navigate("/userform/new");
            }}
          >
            회원가입
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => {
              handleClose();
              props.pwdEmailShowFunc(true);
            }}
          >
            임시 비밀번호 발급
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              axiosApi
                .post("/api/seller/login", {
                  sellerId: loginId,
                  pwd: loginPw,
                })
                .then((res) => {
                  localStorage.setItem("accessToken", res.data.accessToken);
                  localStorage.setItem("refreshToken", res.data.refreshToken);
                  handleClose();
                  navigate("/sellpage");
                })
                .catch((err) => {
                  alert(`${err.response.data.message}`);
                });
            }}
          >
            로그인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
