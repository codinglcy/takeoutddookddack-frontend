import "./css/SellPageForm.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const SellPageForm = () => {
  const url = "http://localhost:3000/buypage";
  return (
    <>
      <div>판매뚝딱 판매페이지폼</div>
      {/* <div className="sellPageForm">
        <Form.Label>페이지 url</Form.Label>
        <Form.Control
          type="text"
          placeholder={url}
          aria-label="Disabled input example"
          disabled
          readOnly
        />
      </div> */}
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
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

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
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

      <div column className="menuList">
        <input
          className="menu"
          plaintext
          readOnly
          defaultValue="email@example.com"
        />
        <input
          className="menu"
          plaintext
          readOnly
          defaultValue="email@example.com"
        />
        <Button variant="outline-secondary" id="button-addon2" className="menu">
          Button
        </Button>
      </div>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          가게 위치
        </Form.Label>
        <Col sm="4">
          <Form.Control type="text" placeholder="근처 건물 주소" />
        </Col>
        <Col sm="3">
          <Form.Control type="text" placeholder="상세 위치" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
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
