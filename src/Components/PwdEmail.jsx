import "./css/PwdEmail.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axiosApi from "../Util/api";

const PwdEmail = (props) => {
  const [gotId, setGotId] = useState();
  const [gotName, setGotName] = useState();
  const [gotEmail, setGotEmail] = useState();

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
              <Form.Label>ID(아이디)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ID"
                onChange={(e) => setGotId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name(성명)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setGotName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email(이메일)</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setGotEmail(e.target.value)}
              />
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
                  sellerId: gotId,
                  name: gotName,
                  email: gotEmail,
                })
                .then((res) => {
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
                          sellerId: gotId,
                          email: gotEmail,
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
