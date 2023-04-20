import { useState } from "react";
import useDidMountEffect from "../Util/useDidMountEffect";
import "./css/HeaderButton.css";
import { useNavigate } from "react-router-dom";
import axiosApi from "../Util/api";

const HeaderButton = (props) => {
  const [getData, setGetData] = useState({});
  const navigate = useNavigate();

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
          {getData.isOpen ? (
            <button
              onClick={() => {
                navigate(`/orderpage/${getData.sellerId}`);
              }}
            >
              주문서 작성
            </button>
          ) : (
            <button disabled={true}>준비중</button>
          )}
        </div>
      );

    case "OrderPage":
      return (
        <div className="headerBtnDiv">
          <button
            onClick={() => {
              if (getData.orderName === "" && getData.orderTel === "") {
                alert("주문자 정보를 입력해 주세요.");
              } else if (getData.orderTel.split("-").length < 2) {
                alert(
                  "전화번호를 다시 확인해 주세요.\n'-'를 포함해 주셔야 합니다."
                );
              } else if (getData.totalPrice === 0) {
                alert("주문할 상품을 골라주세요.");
              } else {
                if (
                  window.confirm(
                    getData.selectMenu
                      .map((menu, idx) => {
                        return `${idx + 1}. ${menu.item} x ${
                          menu.quantity
                        }개\n`;
                      })
                      .join("") +
                      "\n총 금액: " +
                      getData.totalPrice +
                      "\n주문자 정보 - 입금자명: " +
                      getData.orderName +
                      " / 전화번호 뒷자리: " +
                      getData.orderTel.split("-")[
                        getData.orderTel.split("-").length - 1
                      ] +
                      "\n주문하시겠습니까?"
                  )
                ) {
                  axiosApi.post("/api/order", getData);
                  alert(
                    `주문을 완료했습니다. 입금을 진행해 주세요.\n금액: ${getData.totalPrice}`
                  );
                  navigate(`/buypage/${getData.sellerId}`);
                }
              }
            }}
          >
            주문 넣기
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
