import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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

function App() {
  const [isBuyPage, setIsBuyPage] = useState(true);
  const [loginShow, setLoginShow] = useState(false);

  const loginShowFunc = (show) => {
    setLoginShow(show);
  };

  return (
    <BrowserRouter>
      <header className="App-header">
        <div className="PageButtons">
          <Link to={"/sellpage"}>
            <button
              className="SellPageButton"
              onClick={() => {
                setIsBuyPage(false);
                setLoginShow(true);
              }}
            >
              {isBuyPage ? (
                <div className="SellPageno">판매뚝딱</div>
              ) : (
                <div className="SellPageyes">판매뚝딱</div>
              )}
            </button>
            <Login loginShow={loginShow} loginShowFunc={loginShowFunc} />
          </Link>

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
        <Route path="/buypage" element={<BuyPage />}></Route>
        <Route path="/orderpage" element={<OrderPage />}></Route>
        <Route path="/sellpage" element={<SellPage />}></Route>
        <Route path="/sellpageform" element={<SellpageFormPage />}></Route>
        <Route path="/userform" element={<UserFormPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
