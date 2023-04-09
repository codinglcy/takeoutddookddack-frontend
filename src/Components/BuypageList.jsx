import { useEffect, useState } from "react";
import "./css/BuypageList.css";
import SearchByAddress from "./SearchByAddress";
import axios from "axios";

const BuypageList = () => {
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/shop/all").then((res) => {
      setShopList(res.data);
      console.log(res.data);
    });
  }, []);

  const shopListFunc = (list) => {
    setShopList(list);
  };

  return (
    <>
      <div>가게 목록</div>
      <SearchByAddress shopListFunc={shopListFunc} />
      <div className="listBox">
        <table className="table">
          <colgroup>
            <col width="150px" />
            <col width="80px" />
            <col width="100px" />
          </colgroup>
          <thead>
            <tr>
              <th>가게 위치</th>
              <th>가게 상태</th>
              <th>가게 url</th>
            </tr>
          </thead>
          <tbody className="listBody">
            {shopList &&
              shopList.map((shop) => {
                return (
                  <tr key={shop.id}>
                    <td>{shop.location}</td>
                    <td>{shop.open ? "영업중" : "준비중"}</td>
                    <td>
                      <a href={shop.shopUrl}>{shop.shopUrl}</a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BuypageList;
