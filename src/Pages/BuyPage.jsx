import StatusType from "../Components/StatusType";
import ShopInfo from "../Components/ShopInfo";
import SellingSituation from "../Components/SellingSituation";

const BuyPage = () => {
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
