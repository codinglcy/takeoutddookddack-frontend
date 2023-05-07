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
    orderTel: "",
    orderName: "",
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

  useDidMountEffect(() => {
    props.getPageDataFunc(orderInfo);
  }, [orderInfo]);

  return (
    <div className="orderBoxComponentDiv">
      <div className="orderBox">
        <div className="orderBoxTitle">주문서</div>
        <div className="selectMenulistBox">
          {selectMenu &&
            selectMenu.map((menu, idx) => {
              return (
                <div key={idx} id={menu.item} className="selectMenuDiv">
                  <div id={`${menu.item}-idx`} hidden={true}>
                    {idx}
                  </div>
                  <div id={`${menu.item}-item`} className="selectMenuItem">
                    {menu.item}
                  </div>
                  <div id={`${menu.item}-price`} hidden={true}>
                    {menu.price}
                  </div>
                  <div className="quantityPM">
                    <button
                      className="minusplusBtn"
                      onClick={() => minusQuantity(idx)}
                    >
                      <div className="minusplus">-</div>
                    </button>
                    <div
                      id={`${menu.item}-quantity`}
                      className="selectMenuQuantity"
                    >
                      {menu.quantity}
                    </div>
                    <button
                      className="minusplusBtn"
                      onClick={() => plusQuantity(idx)}
                    >
                      <div className="minusplus">+</div>
                    </button>
                  </div>
                  <button
                    id={`${menu.item}-delete`}
                    onClick={() => deleteSelectMenu(idx)}
                    className="selectMenuDeleteBtn"
                  >
                    x
                  </button>
                </div>
              );
            })}
        </div>
        <hr />
        <div className="totalPriceDiv">
          <div>총 금액:</div>
          <div>{totalPrice} 원</div>
        </div>
      </div>

      <button onClick={handleShow} className="orderPersonInfoBtn">
        주문자 정보 입력
      </button>
      <OrderForm
        show={show}
        setShow={setShow}
        orderInfo={orderInfo}
        parentFunc={parentFunc}
      />
    </div>
  );
};

export default OrderBox;
