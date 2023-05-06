import { useEffect, useState } from "react";
import "./css/BuypageList.css";
import SearchByAddress from "./SearchByAddress";
import axiosApi from "../Util/api";

const BuypageList = () => {
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    axiosApi.get("/api/shop/all").then((res) => {
      setShopList(res.data);
    });
  }, []);

  const shopListFunc = (list) => {
    setShopList(list);
  };

  return (
    <div className="BuypageListDiv">
      <div className="BuypageListTitle">가게 목록</div>
      <SearchByAddress shopListFunc={shopListFunc} />
      <div className="pagelistBox">
        <table className="table">
          <colgroup>
            <col width="3.2" />
            <col width="1" />
            <col width="0.8" />
          </colgroup>
          <thead>
            <tr
              className="tableTR"
              style={{
                position: "sticky",
                top: "0",
                backgroundColor: "white",
              }}
            >
              <th>가게 위치</th>
              <th></th>
              <th>url</th>
            </tr>
          </thead>
          <tbody className="listBody">
            {shopList &&
              shopList.map((shop) => {
                return (
                  <tr key={shop.id}>
                    <td>
                      {shop.location &&
                        `${shop.location.address} ${shop.location.more}`}
                    </td>
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
    </div>
  );
};

export default BuypageList;
