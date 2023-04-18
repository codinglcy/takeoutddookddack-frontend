import "./css/ShopInfo.css";

const ShopInfo = (props) => {
  return (
    <>
      {/* <div>주문뚝딱 가게정보(계좌, 위치) 버튼?배지?</div> */}
      <div>
        <div>가게위치</div>
        <div>{props.location}</div>
      </div>
      <div>
        <div>계좌번호</div>
        <div>{props.bankAccount}</div>
      </div>
    </>
  );
};

export default ShopInfo;
