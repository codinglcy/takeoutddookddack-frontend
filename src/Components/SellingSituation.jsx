import { useEffect, useState } from "react";
import "./css/SellingSituation.css";
import axiosApi from "../Util/api";
import useDidMountEffect from "../Util/useDidMountEffect";

const SellingSituation = (props) => {
  const sellerId = props.sellerId;
  const [orders, setOrders] = useState([]);
  const [statusGroup, setStatusGroup] = useState("All");

  const getOrders = () => {
    axiosApi
      .get(`/api/order/shop?sellerId=${sellerId}`)
      .then((res) => {
        const orderBy = ["Check", "New", "Ready"];
        let data = res.data;
        data.sort(
          (a, b) =>
            orderBy.indexOf(a.status) - orderBy.indexOf(b.status) ||
            a.createdAt - b.createdAt
        );
        setOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const statusShow = (status) => {
    if (status === "New") {
      return <div className="newDiv">새주문</div>;
    } else if (status === "Check") {
      return <div className="checkDiv">입금확인</div>;
    } else {
      return <div className="readyDiv">준비완료</div>;
    }
  };

  useEffect(() => {
    axiosApi
      .get(`/api/order/shop?sellerId=${sellerId}`)
      .then((res) => {
        const orderBy = ["Check", "New", "Ready"];
        let data = res.data;
        data.sort(
          (a, b) =>
            orderBy.indexOf(a.status) - orderBy.indexOf(b.status) ||
            a.createdAt - b.createdAt
        );
        setOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sellerId]);

  useDidMountEffect(() => {
    getOrders();
    setTimeout(() => {
      setStatusGroup(props.status);
    }, 100);
  }, [props.status]);

  return (
    <div className="sellingSituationDiv">
      <div className="situation">
        <div className="situationTitle">영업 현황</div>
        <div className="situationTableDiv">
          <table className="situationTable">
            <colgroup>
              <col width="25%" />
              <col width="*" />
              <col width="25%" />
            </colgroup>
            <thead>
              <tr
                style={{
                  position: "sticky",
                  top: "0",
                  backgroundColor: "white",
                }}
              >
                <th>{"주문자 전화번호\n뒷자리"}</th>
                <th>주문 내용</th>
                <th>진행 상태</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                (statusGroup === "All"
                  ? orders
                  : orders.filter((order) => order.status === statusGroup)
                ).map((order, idx) => {
                  return (
                    <tr key={idx}>
                      <td>
                        {
                          order.orderTel.split("-")[
                            order.orderTel.split("-").length - 1
                          ]
                        }
                      </td>
                      <td>
                        {order.selectMenu.length === 1
                          ? order.selectMenu[0].item
                          : order.selectMenu.length === 2
                          ? order.selectMenu[0].item +
                            ", " +
                            order.selectMenu[1].item
                          : order.selectMenu[0].item +
                            ", " +
                            order.selectMenu[1].item +
                            " 외 " +
                            (order.selectMenu.length - 2) +
                            "종"}
                      </td>
                      <td>{statusShow(order.status)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellingSituation;
