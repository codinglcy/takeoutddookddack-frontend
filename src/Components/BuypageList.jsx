import { useEffect, useState } from "react";
import "./css/BuypageList.css";
import SearchByAddress from "./SearchByAddress";
import axiosApi from "../Util/api";
import { useNavigate } from "react-router-dom";

const BuypageList = () => {
  const [shopList, setShopList] = useState([]);
  const navigate = useNavigate();

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
            <col width="4" />
            <col width="1" />
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
            </tr>
          </thead>
          <tbody className="listBody">
            {shopList &&
              shopList.map((shop) => {
                return (
                  <tr
                    key={shop.id}
                    id="buypageLinkTR"
                    onClick={() => {
                      let sellerId = shop.shopUrl.split("/buypage/")[1];
                      navigate(`/buypage/${sellerId}`);
                    }}
                  >
                    <td>
                      {shop.location &&
                        `${shop.location.address} ${shop.location.more}`}
                    </td>
                    <td>{shop.open ? "영업중" : "준비중"}</td>
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
