import StatusType from "../Components/StatusType";
import ShopInfo from "../Components/ShopInfo";
import SellingSituation from "../Components/SellingSituation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const BuyPage = (props) => {
  const params = useParams();
  console.log(params.sellerId);

  useEffect(() => {
    props.isBuyPageFunc(true);
  }, [props]);

  return (
    <div className="Pages">
      <div>주문뚝딱 가게 페이지입니다.</div>
      <ShopInfo />
      <SellingSituation />
      <StatusType />
    </div>
  );
};

export default BuyPage;
