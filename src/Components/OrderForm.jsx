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
      <div>주문뚝딱 주문자정보입력폼</div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId="telNum"
            label="주문자 전화번호"
            className="mb-3"
          >
            <Form.Control
              type="tel"
              placeholder="tel"
              defaultValue={
                orderInfo["telNum"] ? orderInfo["telNum"] : undefined || ""
              }
            />
          </FloatingLabel>
          <FloatingLabel controlId="name" label="주문자명">
            <Form.Control
              type="text"
              placeholder="text"
              defaultValue={
                orderInfo["name"] ? orderInfo["name"] : undefined || ""
              }
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
              orderInfo["telNum"] = document.getElementById("telNum").value;
              orderInfo["name"] = document.getElementById("name").value;
              console.log(JSON.stringify(orderInfo));
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
