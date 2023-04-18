import "./css/PwdEmail.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axiosApi from "../Util/api";

const PwdEmail = (props) => {
  const handleClose = () => {
    props.pwdEmailShowFunc(false);
  };

  return (
    <>
      <Modal show={props.pwdEmailShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>임시 비밀번호 발급</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" placeholder="Enter ID" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>성명</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>이메일</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" />
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
                .patch("/api/seller/checkpwdmail", {
                  sellerId: document.getElementById("id").value,
                  name: document.getElementById("name").value,
                  email: document.getElementById("email").value,
                })
                .then((res) => {
                  console.log(res.data);
                  console.log(
                    res.data.indexOf("이메일이 회원정보와 일치하지 않습니다.")
                  );
                  if (
                    res.data.indexOf("이메일이 회원정보와 일치하지 않습니다.") <
                    0
                  ) {
                    handleClose();
                    alert(res.data);
                  } else {
                    if (window.confirm(res.data)) {
                      axiosApi
                        .patch("/api/seller/pwdmail", {
                          sellerId: document.getElementById("id").value,
                          email: document.getElementById("email").value,
                        })
                        .then((res) => {
                          handleClose();
                          alert(res.data);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  }
                })
                .catch((err) => {
                  alert(err.response.data.message);
                });
            }}
          >
            발급 받기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PwdEmail;
