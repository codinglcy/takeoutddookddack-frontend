import { useState } from "react";
import useDidMountEffect from "../Util/useDidMountEffect";
import "./css/HeaderButton.css";

const HeaderButton = (props) => {
  const [getData, setGetData] = useState({});

  useDidMountEffect(() => {
    setGetData({});
  }, [props.whatPage]);

  useDidMountEffect(() => {
    setGetData(props.getPageData);
  }, [props.getPageData]);

  switch (props.whatPage) {
    case "BuyPage":
      return (
        <div className="headerBtnDiv">
          <button
            onClick={() => {
              console.log(props.whatPage);
              console.log("BuyPage");
              console.log(getData);
            }}
          >
            포장뚝딱 헤더버튼
          </button>
        </div>
      );

    case "OrderPage":
      return (
        <div className="headerBtnDiv">
          <button
            onClick={() => {
              console.log(props.whatPage);
              console.log("OrderPage");
              console.log(getData);
            }}
          >
            포장뚝딱 헤더버튼
          </button>
        </div>
      );

    case "SellPage":
      return (
        <div className="headerBtnDiv">
          <button
            onClick={() => {
              console.log(props.whatPage);
              console.log("SellPage");
              console.log(getData);
            }}
          >
            포장뚝딱 헤더버튼
          </button>
        </div>
      );

    case "SellpageFormPage":
      return (
        <div className="headerBtnDiv">
          <button
            onClick={() => {
              console.log(props.whatPage);
              console.log("SellpageFormPage");
              console.log(getData);
            }}
          >
            포장뚝딱 헤더버튼
          </button>
        </div>
      );

    case "UserFormPage":
      return (
        <div className="headerBtnDiv">
          <button
            onClick={() => {
              console.log(props.whatPage);
              console.log("UserFormPage");
              console.log(getData);
            }}
          >
            포장뚝딱 헤더버튼
          </button>
        </div>
      );

    default:
      break;
  }
};

export default HeaderButton;
