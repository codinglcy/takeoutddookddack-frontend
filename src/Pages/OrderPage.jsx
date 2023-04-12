import { useParams } from "react-router-dom";
import Menu from "../Components/Menu";
import OrderBox from "../Components/OrderBox";
import { useEffect, useState } from "react";

const OrderPage = (props) => {
  const [selectMenu, setSelectMenu] = useState([]);
  const sellerId = useParams().sellerId;
  console.log(sellerId);

  const selectMenuPlusFunc = (menu) => {
    console.log(menu);
    setSelectMenu([...selectMenu, menu]);
  };
  const selectMenuFunc = (list) => {
    setSelectMenu(list);
  };

  useEffect(() => {
    props.isBuyPageFunc(true);
  }, [props]);

  return (
    <div className="Pages">
      <div>주문뚝딱 주문서 작성 페이지입니다.</div>
      <Menu
        sellerId={sellerId}
        selectMenuPlusFunc={selectMenuPlusFunc}
        selectMenu={selectMenu}
      />
      <OrderBox selectMenu={selectMenu} selectMenuFunc={selectMenuFunc} />
    </div>
  );
};

export default OrderPage;
