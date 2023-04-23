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
    props.whatPageFunc("OrderPage");
  });

  return (
    <div className="Pages">
      <Menu
        sellerId={sellerId}
        selectMenuPlusFunc={selectMenuPlusFunc}
        selectMenu={selectMenu}
      />
      <OrderBox
        selectMenu={selectMenu}
        sellerId={sellerId}
        selectMenuFunc={selectMenuFunc}
        getPageDataFunc={props.getPageDataFunc}
      />
    </div>
  );
};

export default OrderPage;
