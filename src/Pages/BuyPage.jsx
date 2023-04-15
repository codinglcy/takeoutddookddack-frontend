import StatusType from "../Components/StatusType";
import ShopInfo from "../Components/ShopInfo";
import SellingSituation from "../Components/SellingSituation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosApi from "../Util/api";

const BuyPage = (props) => {
  const sellerId = useParams().sellerId;
  const [shopInfo, setShopInfo] = useState({});

  useEffect(() => {
    props.isBuyPageFunc(true);
    axiosApi
      .get(`/api/shop/order?sellerId=${sellerId}`)
      .then((res) => {
        setShopInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props, sellerId]);

  return (
    <div className="Pages">
      <div>주문뚝딱 가게 페이지입니다.</div>
      <ShopInfo
        location={shopInfo.location}
        bankAccount={shopInfo.bankAccount}
      />
      <SellingSituation sellerId={sellerId} />
      <StatusType />
    </div>
  );
};

export default BuyPage;
