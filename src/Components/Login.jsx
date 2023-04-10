import "./css/Login.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axiosApi from "../Util/api";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const logShow = props.loginShow;
  const { navigate } = useNavigate();

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
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="Enter ID" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              axiosApi
                .get("/api/seller/login", {
                  sellerId: document.getElementById("id").value,
                  pwd: document.getElementById("password").value,
                })
                .then((res) => {
                  console.log(res.data);
                  localStorage.setItem("accessToken", res.data.accessToken);
                  localStorage.setItem("refreshToken", res.data.refreshToken);
                  handleClose();
                  navigate("/sellpage");
                })
                .catch((err) => {
                  console.log(err);
                  // alert('존재하지 않는 아이디입니다.')
                  // alert('비밀번호를 다시 확인해주세요.')
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
