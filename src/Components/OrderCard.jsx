import { useEffect, useState } from "react";
import "./css/OrderCard.css";
import { Card } from "react-bootstrap";
import axiosApi from "../Util/api";

const OrderCard = (props) => {
  const [order, setOrder] = useState({});
  const [idx, setIdx] = useState();

  const removeOrder = (id, idx) => {
    if (window.confirm(`${idx}번 카드의 주문 건을 삭제하시겠습니까?`)) {
      axiosApi.delete(`/api/order/${id}`);
      setTimeout(() => {
        props.getOrdersFunc();
      }, 10);
    }
  };

  const editStatus = (id, status) => {
    axiosApi.patch(`/api/order/${id}?status=${status}`);
    setTimeout(() => {
      props.getOrdersFunc();
    }, 10);
  };

  useEffect(() => {
    setTimeout(() => {
      setIdx(props.idx);
      setOrder(props.orderInfo);
    }, 10);
  }, [props.idx, props.orderInfo]);

  return (
    <div className="ordercardDiv">
      <div id="orderNumber">{idx + 1 || ""}</div>
      <button id="closeBtn" onClick={() => removeOrder(order.id, idx + 1)}>
        x
      </button>
      <Card className="orderCards" style={{ width: "19rem" }}>
        <Card.Body>
          <div>
            입금자명:
            <input
              style={{
                border: "none",
                paddingLeft: "40px",
                width: "187px",
                textAlign: "center",
              }}
              readOnly
              value={order.orderName || ""}
            />
          </div>

          <div>
            전화번호:
            <input
              style={{
                border: "none",
                paddingLeft: "40px",
                width: "187px",
                textAlign: "center",
              }}
              readOnly
              value={order.orderTel || ""}
            />
          </div>

          <div>
            주문내용
            <input
              style={{
                border: "none",
                paddingLeft: "40px",
                width: "187px",
                textAlign: "right",
              }}
              readOnly
              value={`총 합계:  ${order.totalPrice}원` || "총 합계: 0원"}
            />
            <div className="orderMenuInfoDiv" style={{ border: "solid" }}>
              <table className="table">
                <colgroup>
                  <col width="60%" />
                  <col width="40%" />
                </colgroup>
                <tbody>
                  {order.selectMenu &&
                    order.selectMenu.map((menu) => {
                      return (
                        <tr key={menu.item}>
                          <td>{menu.item}</td>
                          <td>X{menu.quantity}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="orderCardStatusBtn">
            {Object.is(order.status, "New") ? (
              <button
                className="newBtnCheck"
                disabled={true}
                onClick={() => editStatus(order.id, "New")}
              >
                새주문
              </button>
            ) : (
              <button
                className="newBtn"
                onClick={() => editStatus(order.id, "New")}
              >
                새주문
              </button>
            )}
            {Object.is(order.status, "Check") ? (
              <button
                className="checkBtnCheck"
                disabled={true}
                onClick={() => editStatus(order.id, "Check")}
              >
                입금확인
              </button>
            ) : (
              <button
                className="checkBtn"
                onClick={() => editStatus(order.id, "Check")}
              >
                입금확인
              </button>
            )}
            {Object.is(order.status, "Ready") ? (
              <button
                className="readyBtnCheck"
                disabled={true}
                onClick={() => editStatus(order.id, "Ready")}
              >
                준비완료
              </button>
            ) : (
              <button
                className="readyBtn"
                onClick={() => editStatus(order.id, "Ready")}
              >
                준비완료
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderCard;
