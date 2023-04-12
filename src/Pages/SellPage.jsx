import CardList from "../Components/CardList";
import StatusType from "../Components/StatusType";
import { useEffect } from "react";

const SellPage = (props) => {
  useEffect(() => {
    props.isBuyPageFunc(false);
  }, [props]);

  return (
    <div className="Pages">
      <div>판매뚝딱 판매자 페이지입니다.</div>
      <StatusType />
      <CardList />
    </div>
  );
};

export default SellPage;
