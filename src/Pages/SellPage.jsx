import { useNavigate } from "react-router-dom";
import CardList from "../Components/CardList";
import { useEffect, useState } from "react";
import axiosApi from "../Util/api";
import getAccessToken from "../Util/checkAccessToken";
import useDidMountEffect from "../Util/useDidMountEffect";

const SellPage = (props) => {
  const [isOpen, setIsOpen] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    props.isBuyPageFunc(false);
    props.whatPageFunc("SellPage");
  }, [props]);

  useEffect(() => {
    axiosApi
      .get("/api/shop", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((res) => {
        const getResData = res.data;
        if (
          !getResData.menu ||
          !getResData.location ||
          !getResData.bankAccount
        ) {
          if (
            window.confirm(
              "회원님의 가게 정보가 비어있습니다.\n채우러 가시겠습니까?"
            )
          ) {
            navigate("/sellpageform");
          }
        }
        setIsOpen(getResData.open);
      })
      .catch((err) => console.log(err));
  }, [navigate]);

  useDidMountEffect(() => {
    props.getPageDataFunc({ isOpen: isOpen });
    console.log(isOpen);
  }, [isOpen]);

  const deleteSellerId = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      axiosApi.delete("/api/seller", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
    }
  };

  const logout = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      axiosApi.delete("/api/seller/logout", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div className="Pages">
      <div className="sellpageButtonsDiv">
        <button
          className="sellpageButtons"
          onClick={() => navigate("/sellpageform")}
        >
          페이지 수정
        </button>
        <button
          className="sellpageButtons"
          onClick={() => navigate("/userform/edit")}
        >
          회원정보 수정
        </button>
        <button className="sellpageButtons" onClick={deleteSellerId}>
          회원 탈퇴
        </button>
        <button className="sellpageButtons" onClick={logout}>
          로그아웃
        </button>
      </div>
      <CardList />
    </div>
  );
};

export default SellPage;
