import "./css/OrderForm.css";
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const OrderForm = (props) => {
  const [show, setShow] = [props.show, props.setShow];

  const handleClose = () => setShow(false);

  const orderInfo = props.orderInfo;

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>주문자 정보 입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="telNum"
            label="주문자 전화번호 ( -을 포함해서 적어주세요. 예시: 000-0000 )"
            className="mb-3"
          >
            <Form.Control
              type="tel"
              placeholder="tel"
              defaultValue={orderInfo["telNum"] || ""}
            />
          </FloatingLabel>
          <FloatingLabel controlId="name" label="주문자명">
            <Form.Control
              type="text"
              placeholder="text"
              defaultValue={orderInfo["name"] || ""}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              orderInfo["orderTel"] = document.getElementById("telNum").value;
              orderInfo["orderName"] = document.getElementById("name").value;
              props.parentFunc(orderInfo);
            }}
          >
            완료
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderForm;
