import { useParams } from "react-router-dom";
import Menu from "../Components/Menu";
import OrderBox from "../Components/OrderBox";

const OrderPage = () => {
  const params = useParams();
  console.log(params.sellerId);
  return (
    <div className="Pages">
      <div>주문뚝딱 주문서 작성 페이지입니다.</div>
      <Menu />
      <OrderBox />
    </div>
  );
};

export default OrderPage;
