import { useEffect, useState } from "react";
import "./css/ShopInfo.css";

const ShopInfo = (props) => {
  const [location, setLocation] = useState({});
  const [bankAccount, setBankAccount] = useState({});

  useEffect(() => {
    setLocation(props.info.location);
    setBankAccount(props.info.bankAccount);
  }, [props]);

  return (
    <div className="ShopInfoDiv">
      <div className="shopLocationDiv">
        <div className="shopdivtitle">가게위치</div>
        <div className="shopdivbody">
          {location && `${location.address} ${location.more}`}
        </div>
      </div>
      <div className="shopBankAccountDiv">
        <div className="shopdivtitle">계좌번호</div>
        <div className="shopdivbody">
          {bankAccount &&
            `${bankAccount.bank} ${bankAccount.accountNum} ${bankAccount.name}`}
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
