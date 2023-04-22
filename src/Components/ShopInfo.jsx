import "./css/ShopInfo.css";

const ShopInfo = (props) => {
  return (
    <div className="ShopInfoDiv">
      <div className="shopLocationDiv">
        <div className="shopdivtitle">가게위치</div>
        <div className="shopdivbody">{props.location}</div>
      </div>
      <div className="shopBankAccountDiv">
        <div className="shopdivtitle">계좌번호</div>
        <div className="shopdivbody">{props.bankAccount}</div>
      </div>
    </div>
  );
};

export default ShopInfo;
