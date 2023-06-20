import { useState } from "react";
import useDidMountEffect from "../Util/useDidMountEffect";
import "./css/HeaderButton.css";
import { useNavigate } from "react-router-dom";
import axiosApi from "../Util/api";
import getAccessToken from "../Util/checkAccessToken";

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
              if (!getData.orderName && !getData.orderTel) {
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
                    getData.selectMenu &&
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
              const token = getAccessToken();

              const api = () => {
                axiosApi.patch(
                  `/api/shop/open`,
                  {
                    isOpen: !getData.isOpen,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              };

              if (getData.isOpen) {
                if (window.confirm("오늘의 영업을 종료하시겠습니까?")) {
                  if (
                    window.confirm(
                      "영업을 종료하면 현재 남아있는 주문을 모두 삭제합니다.\n영업을 종료하시겠습까?"
                    )
                  ) {
                    api();
                    axiosApi.delete("/api/order/sellerId", {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    });
                    window.location.reload();
                  }
                }
              } else {
                alert("영업을 시작합니다.");
                api();
                window.location.reload();
              }
            }}
          >
            {getData.isOpen ? "영업 종료" : "영업 시작"}
          </button>
        </div>
      );

    case "SellpageFormPage":
      const alertFunc = () => {
        if (!getData.menu) {
          alert("가게의 메뉴를 입력해주세요.");
        } else if (!getData.location[0] || !getData.location[1]) {
          alert(
            "가게 위치에 대해 입력해주세요.\n주변의 건물 주소 / 상세 위치 순서입니다."
          );
        } else if (
          !getData.bankAccount[0] ||
          !getData.bankAccount[1] ||
          !getData.bankAccount[2]
        ) {
          alert(
            "입금 받을 계좌의 빈칸을 채워주세요.\n은행 / 계좌번호 / 예금주명 순서입니다."
          );
        }
      };
      return (
        <div className="headerBtnDiv">
          <button
            onClick={() => {
              const token = getAccessToken();
              if (
                getData.menu &&
                getData.location[0] &&
                getData.location[1] &&
                getData.bankAccount[0] &&
                getData.bankAccount[1] &&
                getData.bankAccount[2]
              ) {
                axiosApi.patch(
                  "/api/shop",
                  {
                    id: getData.id,
                    location: {
                      address: getData.location[0],
                      more: getData.location[1],
                    },
                    bankAccount: {
                      bank: getData.bankAccount[0],
                      accountNum: getData.bankAccount[1],
                      name: getData.bankAccount[2],
                    },
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                setTimeout(() => {
                  navigate("/sellPage");
                }, 300);
              } else {
                alertFunc();
              }
            }}
          >
            수정 완료
          </button>
        </div>
      );

    case "UserFormPage":
      const checkEmail = () => {
        let correct_email = // eslint-disable-next-line
          /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        if (!correct_email.test(getData.email)) {
          return false;
        } else {
          return true;
        }
      };

      const bodyData = {
        sellerId: getData.sellerId,
        pwd: getData.pwd,
        email: getData.email,
        name: getData.name,
      };

      return (
        <div className="headerBtnDiv">
          {getData.newedit === "new" ? (
            <button
              onClick={() => {
                if (
                  !getData.sellerId ||
                  !getData.pwd ||
                  !getData.email ||
                  !getData.name
                ) {
                  alert("빈 칸을 모두 채워주세요.");
                } else if (!getData.idCheck) {
                  alert("아이디 중복 확인을 진행해주세요.");
                } else if (!getData.pwdCheck) {
                  alert(
                    "비밀번호란과 비밀번호 확인란에 입력한 내용이 다릅니다."
                  );
                } else if (!checkEmail()) {
                  alert("이메일을 다시 확인해 주세요.");
                } else {
                  axiosApi.post("/api/seller", bodyData);
                  axiosApi.post("/api/shop", {
                    sellerId: getData.sellerId,
                  });
                  setTimeout(() => {
                    navigate("/");
                  }, 300);
                }
              }}
            >
              가입 완료
            </button>
          ) : (
            <button
              onClick={() => {
                const token = getAccessToken();

                if (!getData.sellerId || !getData.email || !getData.name) {
                  alert("빈 칸을 모두 채워주세요.");
                } else if (!getData.idCheck) {
                  alert("아이디 중복 확인을 진행해주세요.");
                } else if (!getData.pwdCheck) {
                  alert(
                    "비밀번호란과 비밀번호 확인란에 입력한 내용이 다릅니다."
                  );
                } else if (!checkEmail()) {
                  alert("이메일을 다시 확인해 주세요.");
                } else {
                  axiosApi
                    .patch("/api/seller", bodyData, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then((res) => {
                      if (res.data) {
                        localStorage.setItem("accessToken", res.data);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setTimeout(() => {
                    navigate("/sellPage");
                  }, 700);
                }
              }}
            >
              수정 완료
            </button>
          )}
        </div>
      );

    default:
      break;
  }
};

export default HeaderButton;
