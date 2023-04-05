import "./css/SellPageForm.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DaumPostCode from "react-daum-postcode";
import { useState } from "react";
import { InputGroup } from "react-bootstrap";

const SellPageForm = () => {
  const url = "http://localhost:3000/buypage";
  const [show, setShow] = useState(false);

  return (
    <>
      <div>판매뚝딱 판매페이지폼</div>
      <Form.Group as={Row} className="mb-3" controlId="pageUrl">
        <Form.Label column sm="2">
          페이지 url
        </Form.Label>
        <Col sm="7">
          <Form.Control
            type="text"
            placeholder={url}
            aria-label="Disabled input example"
            disabled
            readOnly
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="menuPlus">
        <Form.Label column sm="2">
          메뉴
        </Form.Label>
        <Col sm="3">
          <Form.Control type="text" placeholder="메뉴명" />
        </Col>
        <Col sm="3">
          <Form.Control type="text" placeholder="가격" />
        </Col>
        <Col sm="1">
          <Button variant="outline-secondary" id="button-addon2">
            Button
          </Button>
        </Col>
      </Form.Group>

      <div className="menuList">
        <input className="menu" readOnly defaultValue="email@example.com" />
        <input className="menu" readOnly defaultValue="email@example.com" />
        <Button variant="outline-secondary" id="button-addon2" className="menu">
          Button
        </Button>
      </div>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          가게 위치
        </Form.Label>
        <Col sm="4">
          <InputGroup className="mb-3">
            <Form.Control
              id="address"
              type="text"
              readOnly
              placeholder="근처 건물 주소"
            />

            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => setShow(true)}
            >
              찾기
            </Button>
          </InputGroup>
        </Col>
        <Modal show={show} onHide={() => setShow(false)} keyboard={false}>
          <DaumPostCode
            autoClose
            onComplete={(data) => {
              document.getElementById("address").value = data.jibunAddress;
              setShow(false);
            }}
          />
        </Modal>
        <Col sm="3">
          <Form.Control type="text" placeholder="상세 (ex: 앞 / 맞은편)" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="account">
        <Form.Label column sm="2">
          입금 받을 계좌
        </Form.Label>
        <Col sm="1">
          <Form.Control type="text" placeholder="은행" />
        </Col>
        <Col sm="4">
          <Form.Control type="text" placeholder="계좌번호" />
        </Col>
        <Col sm="2">
          <Form.Control type="text" placeholder="예금주명" />
        </Col>
      </Form.Group>
    </>
  );
};

export default SellPageForm;
