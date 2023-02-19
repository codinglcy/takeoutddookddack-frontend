import Menu from "../Components/Menu";
import OrderBox from "../Components/OrderBox";

const OrderPage = () => {
  return (
    <div className="Pages">
      <div>주문뚝딱 주문서 작성 페이지입니다.</div>
      <Menu />
      <OrderBox />
    </div>
  );
};

export default OrderPage;
