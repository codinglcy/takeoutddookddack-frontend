import { useParams } from "react-router-dom";
import Menu from "../Components/Menu";
import OrderBox from "../Components/OrderBox";
import { useEffect, useState } from "react";

const OrderPage = (props) => {
  const [selectMenu, setSelectMenu] = useState([]);
  const sellerId = useParams().sellerId;
  console.log(sellerId);

  const selectMenuFunc = (menu) => {
    console.log(menu);
    setSelectMenu([...selectMenu, menu]);
  };

  useEffect(() => {
    props.isBuyPageFunc(true);
  }, [props]);

  return (
    <div className="Pages">
      <div>주문뚝딱 주문서 작성 페이지입니다.</div>
      <Menu
        sellerId={sellerId}
        selectMenuFunc={selectMenuFunc}
        selectMenu={selectMenu}
      />
      <OrderBox selectMenu={selectMenu} />
    </div>
  );
};

export default OrderPage;
