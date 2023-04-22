import StatusType from "../Components/StatusType";
import ShopInfo from "../Components/ShopInfo";
import SellingSituation from "../Components/SellingSituation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosApi from "../Util/api";

const BuyPage = (props) => {
  const sellerId = useParams().sellerId;
  const [shopInfo, setShopInfo] = useState({});
  const [status, setStatus] = useState("");

  const statusFunc = (statusValue) => {
    setStatus(statusValue);
  };

  useEffect(() => {
    props.isBuyPageFunc(true);
    props.whatPageFunc("BuyPage");
    axiosApi
      .get(`/api/shop/order?sellerId=${sellerId}`)
      .then((res) => {
        setShopInfo(res.data);
        props.getPageDataFunc({
          isOpen: res.data.open,
          sellerId: sellerId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props, sellerId]);

  return (
    <div className="Pages">
      <ShopInfo
        location={shopInfo.location}
        bankAccount={shopInfo.bankAccount}
      />
      <SellingSituation sellerId={sellerId} status={status} />
      <StatusType statusFunc={statusFunc} />
    </div>
  );
};

export default BuyPage;
