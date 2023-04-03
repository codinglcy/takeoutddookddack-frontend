import "./css/OrderBox.css";
import React, { useState } from "react";
import OrderForm from "./OrderForm";

const OrderBox = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const [orderInfo, setOrderInfo] = useState({
    info1: "11111",
    info2: "22222",
    info3: "33333",
    telNum: "",
    name: "",
  });

  const parentFunc = (orderInfor) => {
    setOrderInfo((current) => {
      let newInfo = { ...current };
      newInfo["telNum"] = orderInfor["telNum"];
      newInfo["name"] = orderInfor["name"];
      return newInfo;
    });
  };

  return (
    <>
      <div>주문뚝딱 주문서&주문자정보입력버튼</div>
      <button onClick={handleShow}>주문자 정보 입력</button>
      <OrderForm
        show={show}
        setShow={setShow}
        orderInfo={orderInfo}
        setOrderInfo={setOrderInfo}
        parentFunc={parentFunc}
      />

      <button
        onClick={() => {
          console.log(JSON.stringify(orderInfo));
        }}
      >
        정보보기
      </button>
    </>
  );
};

export default OrderBox;
