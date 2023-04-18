import "./css/Register.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axiosApi from "../Util/api";
import getAccessToken from "../Util/checkAccessToken";

const Register = (props) => {
  const [seller, setSeller] = useState({});

  useEffect(() => {
    if (props.newedit === "edit") {
      axiosApi
        .get("/api/seller", {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .then((res) => {
          setSeller(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.newedit]);

  return (
    <>
      <div>판매뚝딱 회원가입폼</div>
      <div className="registerForm">
        <InputGroup className="mb-3">
          <FloatingLabel controlId="id" label="ID(아이디)">
            <Form.Control
              type="text"
              placeholder="id"
              defaultValue={seller.sellerId || ""}
            />
          </FloatingLabel>
          <Button variant="outline-secondary" id="button-addon2">
            Button
          </Button>
        </InputGroup>
        <FloatingLabel
          controlId="password"
          label="Password(비밀번호)"
          className="mb-3"
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <FloatingLabel
          controlId="checkPW"
          label="Check Password(비밀번호 확인)"
          className="mb-3"
        >
          <Form.Control type="password" placeholder="Password" />
        </FloatingLabel>
        <FloatingLabel
          controlId="email"
          label="Email address(이메일)"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            defaultValue={seller.email || ""}
          />
        </FloatingLabel>
        <FloatingLabel controlId="name" label="Name(성명)" className="mb-3">
          <Form.Control
            type="text"
            placeholder="name"
            defaultValue={seller.name || ""}
          />
        </FloatingLabel>
      </div>
    </>
  );
};

export default Register;
