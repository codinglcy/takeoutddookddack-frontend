import { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import "./css/CardList.css";
import axiosApi from "../Util/api";
import getAccessToken from "../Util/checkAccessToken";
import useDidMountEffect from "../Util/useDidMountEffect";

const CardList = () => {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState("");

  const getOrdersFunc = () => {
    axiosApi
      .get("/api/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  useEffect(() => {
    setToken(getAccessToken());
  }, []);

  useDidMountEffect(() => {
    getOrdersFunc();
  }, [token]);

  return (
    <div className="cardList">
      <div>판매뚝딱 주문카드 리스트</div>
      {orders &&
        orders.map((orderInfo, idx) => {
          return (
            <OrderCard
              key={idx}
              idx={idx}
              orderInfo={orderInfo}
              getOrdersFunc={getOrdersFunc}
            />
          );
        })}
    </div>
  );
};

export default CardList;
