import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import BuyPage from "./Pages/BuyPage";
import SellPage from "./Pages/SellPage";
import OrderPage from "./Pages/OrderPage";
import SellpageFormPage from "./Pages/SellpageFormPage";
import BuypageListPage from "./Pages/BuypageListPage";
import UserFormPage from "./Pages/UserFormPage";
import HeaderButton from "./Components/HeaderButton";
import Login from "./Components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import getAccessToken from "./Util/checkAccessToken";
import PwdEmail from "./Components/PwdEmail";

function App() {
  const [isBuyPage, setIsBuyPage] = useState(true);
  const [loginShow, setLoginShow] = useState(false);
  const [pwdEmailShow, setPwdEmailShow] = useState(false);
  const [whatPage, setWhatPage] = useState("");
  const [getPageData, setGetPageData] = useState({});
  const navigate = useNavigate();

  const loginShowFunc = (show) => {
    setLoginShow(show);
  };
  const isBuyPageFunc = (is) => {
    setIsBuyPage(is);
  };
  const pwdEmailShowFunc = (truefalse) => {
    setPwdEmailShow(truefalse);
  };
  const whatPageFunc = (page) => {
    setWhatPage(page);
  };
  const getPageDataFunc = (pageData) => {
    setGetPageData(pageData);
  };

  return (
    <>
      <header className="App-header">
        <div className="PageButtons">
          <button
            className="SellPageButton"
            onClick={() => {
              if (localStorage.getItem("accessToken") && getAccessToken()) {
                navigate("/sellPage");
              } else {
                setLoginShow(true);
              }
            }}
          >
            {isBuyPage ? (
              <div className="SellPageno">판매뚝딱</div>
            ) : (
              <div className="SellPageyes">판매뚝딱</div>
            )}
          </button>
          <Login
            loginShow={loginShow}
            loginShowFunc={loginShowFunc}
            pwdEmailShowFunc={pwdEmailShowFunc}
          />
          <PwdEmail
            pwdEmailShow={pwdEmailShow}
            pwdEmailShowFunc={pwdEmailShowFunc}
          />

          <Link to={"/"}>
            <button className="BuyPageButton">
              {isBuyPage ? (
                <div className="BuyPageyes">주문뚝딱</div>
              ) : (
                <div className="BuyPageno">주문뚝딱</div>
              )}
            </button>
          </Link>
        </div>

        <a href="http://localhost:3000/">
          <div className="App-title">포장뚝딱</div>
        </a>

        <div className="HeaderBtnDiv">
          <HeaderButton whatPage={whatPage} getPageData={getPageData} />
        </div>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <BuypageListPage
              isBuyPageFunc={isBuyPageFunc}
              whatPageFunc={whatPageFunc}
            />
          }
        ></Route>
        <Route
          path="/buypage/:sellerId"
          element={
            <BuyPage
              isBuyPageFunc={isBuyPageFunc}
              whatPageFunc={whatPageFunc}
              getPageDataFunc={getPageDataFunc}
            />
          }
        ></Route>
        <Route
          path="/orderpage/:sellerId"
          element={
            <OrderPage
              isBuyPageFunc={isBuyPageFunc}
              whatPageFunc={whatPageFunc}
              getPageDataFunc={getPageDataFunc}
            />
          }
        ></Route>
        <Route
          path="/sellpage"
          element={
            <SellPage
              isBuyPageFunc={isBuyPageFunc}
              whatPageFunc={whatPageFunc}
              getPageDataFunc={getPageDataFunc}
            />
          }
        ></Route>
        <Route
          path="/sellpageform"
          element={
            <SellpageFormPage
              isBuyPageFunc={isBuyPageFunc}
              whatPageFunc={whatPageFunc}
              getPageDataFunc={getPageDataFunc}
            />
          }
        ></Route>
        <Route
          path="/userform/:newedit"
          element={
            <UserFormPage
              isBuyPageFunc={isBuyPageFunc}
              whatPageFunc={whatPageFunc}
              getPageDataFunc={getPageDataFunc}
            />
          }
        ></Route>
      </Routes>
    </>
  );
}

export default App;
