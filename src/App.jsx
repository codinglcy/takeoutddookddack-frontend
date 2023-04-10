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

function App() {
  const [isBuyPage, setIsBuyPage] = useState(true);
  const [loginShow, setLoginShow] = useState(false);
  const navigate = useNavigate();

  const loginShowFunc = (show) => {
    setLoginShow(show);
  };
  const isBuyPageFunc = (is) => {
    setIsBuyPage(is);
  };

  return (
    <>
      <header className="App-header">
        <div className="PageButtons">
          <button
            className="SellPageButton"
            onClick={() => {
              if (localStorage.getItem("accessToken") && getAccessToken()) {
                setIsBuyPage(false);
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
            isBuyPageFunc={isBuyPageFunc}
          />

          <Link to={"/"}>
            <button
              className="BuyPageButton"
              onClick={() => {
                setIsBuyPage(true);
              }}
            >
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

        <HeaderButton />
      </header>

      <Routes>
        <Route path="/" element={<BuypageListPage />}></Route>
        <Route path="/buypage/:sellerId" element={<BuyPage />}></Route>
        <Route path="/orderpage/:sellerId" element={<OrderPage />}></Route>
        <Route path="/sellpage" element={<SellPage />}></Route>
        <Route path="/sellpageform" element={<SellpageFormPage />}></Route>
        <Route path="/userform" element={<UserFormPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
