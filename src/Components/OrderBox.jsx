import "./css/OrderBox.css";
import React, { useState } from "react";
import OrderForm from "./OrderForm";
import useDidMountEffect from "../Util/useDidMountEffect";

const OrderBox = (props) => {
  const [show, setShow] = useState(false);
  const [selectMenu, setSelectMenu] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleShow = () => setShow(true);

  const [orderInfo, setOrderInfo] = useState({
    status: "New",
    sellerId: props.sellerId,
    telNum: "",
    name: "",
    selectMenu: [],
    totalPrice: 0,
  });

  const parentFunc = (orderInfor) => {
    setOrderInfo((current) => {
      let newInfo = { ...current };
      newInfo["telNum"] = orderInfor["telNum"];
      newInfo["name"] = orderInfor["name"];
      return newInfo;
    });
  };

  const plusQuantity = (idx) => {
    let copySelectMenu = [...selectMenu];
    copySelectMenu[idx].quantity = copySelectMenu[idx].quantity + 1;
    setSelectMenu(copySelectMenu);
  };
  const minusQuantity = (idx) => {
    let copySelectMenu = [...selectMenu];
    if (copySelectMenu[idx].quantity > 1) {
      copySelectMenu[idx].quantity = copySelectMenu[idx].quantity - 1;
      setSelectMenu(copySelectMenu);
    }
  };

  const deleteSelectMenu = (idx) => {
    let copySelectMenu = [...selectMenu];
    copySelectMenu.splice(idx, 1);
    setSelectMenu(copySelectMenu);
  };

  useDidMountEffect(() => {
    let total = 0;
    setSelectMenu(props.selectMenu);
    props.selectMenu.map((menu) => {
      console.log(menu.price, menu.quantity, total);
      total = total + menu.price * menu.quantity;
      return total;
    });
    setTotalPrice(total);

    setOrderInfo((current) => {
      let newInfo = { ...current };
      newInfo["selectMenu"] = props.selectMenu;
      newInfo["totalPrice"] = total;
      return newInfo;
    });
  }, [props.selectMenu]);

  useDidMountEffect(() => {
    props.selectMenuFunc(selectMenu);
  }, [selectMenu]);

  return (
    <>
      <div>주문뚝딱 주문서&주문자정보입력버튼</div>

      <div className="orderBox">
        <div className="menuTitle">주문서</div>
        <div className="listBox">
          {selectMenu &&
            selectMenu.map((menu, idx) => {
              return (
                <div key={idx} id={menu.item}>
                  <div id={`${menu.item}-idx`} hidden={true}>
                    {idx}
                  </div>
                  <div id={`${menu.item}-item`}>{menu.item}</div>
                  <div id={`${menu.item}-price`} hidden={true}>
                    {menu.price}
                  </div>
                  <div className="quantityPM">
                    <button
                      className="minusBtn"
                      onClick={() => minusQuantity(idx)}
                    >
                      -
                    </button>
                    <div id={`${menu.item}-quantity`}>{menu.quantity}</div>
                    <button
                      className="plusBtn"
                      onClick={() => plusQuantity(idx)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    id={`${menu.item}-delete`}
                    onClick={() => deleteSelectMenu(idx)}
                  >
                    x
                  </button>
                </div>
              );
            })}
        </div>
        <div>
          <div>총 금액:</div>
          <div>{totalPrice} 원</div>
        </div>
      </div>

      <button onClick={handleShow}>주문자 정보 입력</button>
      <OrderForm
        show={show}
        setShow={setShow}
        orderInfo={orderInfo}
        parentFunc={parentFunc}
      />

      <button
        onClick={() => {
          console.log(orderInfo);
          console.log(props.selectMenu);
        }}
      >
        정보보기
      </button>
    </>
  );
};

export default OrderBox;
