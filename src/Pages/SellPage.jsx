import CardList from "../Components/CardList";
import StatusType from "../Components/StatusType";

const SellPage = () => {
  return (
    <div className="Pages">
      <div>판매뚝딱 판매자 페이지입니다.</div>
      <StatusType />
      <CardList />
    </div>
  );
};

export default SellPage;
