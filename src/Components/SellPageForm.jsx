import "./css/SellPageForm.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DaumPostCode from "react-daum-postcode";
import { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import axiosApi from "../Util/api";
import getAccessToken from "../Util/checkAccessToken";
import useDidMountEffect from "../Util/useDidMountEffect";

const SellPageForm = () => {
  const [show, setShow] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [sellerShopInfo, setSellerShopInfo] = useState({});
  const [shopMenu, setShopMenu] = useState([]);
  const [shopLocation, setShopLocation] = useState("");
  const [shopBankAccount, setShopBankAccount] = useState("");

  useEffect(() => {
    let token = getAccessToken();
    setAccessToken(token);
  }, []);

  useDidMountEffect(() => {
    axiosApi
      .get("/api/shop", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setSellerShopInfo(res.data);
      });
  }, [accessToken]);

  useDidMountEffect(() => {
    setShopMenu(sellerShopInfo.menu);
    setShopLocation(sellerShopInfo.location);
    setShopBankAccount(sellerShopInfo.bankAccount);
  }, [sellerShopInfo]);

  return (
    <>
      <div>판매뚝딱 판매페이지폼</div>
      <Form.Group as={Row} className="mb-3" controlId="pageUrl">
        <Form.Label column sm="2">
          페이지 url
        </Form.Label>
        <Col sm="7">
          <Form.Control
            type="text"
            placeholder={sellerShopInfo.shopUrl}
            aria-label="Disabled input example"
            disabled
            readOnly
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          메뉴
        </Form.Label>
        <Col sm="3">
          <Form.Control type="text" placeholder="메뉴명" id="plusMenuItem" />
        </Col>
        <Col sm="3">
          <Form.Control type="text" placeholder="가격" id="plusMenuPrice" />
        </Col>
        <Col sm="1">
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={() => {
              axiosApi
                .patch("/api/shop/addmenu", {
                  id: sellerShopInfo.id,
                  item: document.getElementById("plusMenuItem").value,
                  price: document.getElementById("plusMenuPrice").value,
                })
                .then((res) => {
                  setSellerShopInfo(res.data);
                });
              document.getElementById("plusMenuItem").value = "";
              document.getElementById("plusMenuPrice").value = "";
            }}
          >
            추가
          </Button>
        </Col>
      </Form.Group>

      <div className="menuList">
        {shopMenu &&
          shopMenu.map((menu) => {
            return (
              <div key={`${menu.item}-div`}>
                <input
                  key={menu.item}
                  className="menu"
                  readOnly
                  defaultValue={menu.item}
                  id={menu.item}
                />
                <input
                  key={`${menu.item}-price`}
                  className="menu"
                  readOnly
                  defaultValue={menu.price}
                />
                <Button
                  key={`${menu.item}-btn`}
                  variant="outline-secondary"
                  id="button-addon2"
                  className="menu"
                  onClick={() => {
                    if (
                      window.confirm(
                        `메뉴: ${menu.item}\n가격: ${menu.price}\n정말 삭제하시겠습니까?`
                      )
                    ) {
                      axiosApi
                        .patch("/api/shop/deletemenu", {
                          id: sellerShopInfo.id,
                          item: menu.item,
                        })
                        .then((res) => {
                          setSellerShopInfo(res.data);
                        });
                    }
                  }}
                >
                  삭제
                </Button>
              </div>
            );
          })}
      </div>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          가게 위치
        </Form.Label>
        <Col sm="4">
          <InputGroup className="mb-3">
            <Form.Control
              id="address"
              type="text"
              readOnly
              placeholder="근처 건물 주소"
              defaultValue={(shopLocation || "")
                .split(" ")
                .slice(0, -1)
                .join(" ")}
            />

            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => setShow(true)}
            >
              찾기
            </Button>
          </InputGroup>
        </Col>
        <Modal show={show} onHide={() => setShow(false)} keyboard={false}>
          <DaumPostCode
            autoClose
            onComplete={(data) => {
              document.getElementById("address").value = data.jibunAddress;
              setShow(false);
            }}
          />
        </Modal>
        <Col sm="3">
          <Form.Control
            type="text"
            id="addressMore"
            placeholder="상세 (ex: 앞 / 맞은편)"
            defaultValue={(shopLocation || "").split(" ").slice(-1)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          입금 받을 계좌
        </Form.Label>
        <Col sm="1">
          <Form.Control
            type="text"
            id="bank"
            placeholder="은행"
            defaultValue={(shopBankAccount || "").split(" ").slice(0)}
          />
        </Col>
        <Col sm="4">
          <Form.Control
            type="text"
            id="accountNum"
            placeholder="계좌번호"
            defaultValue={(shopBankAccount || "").split(" ").slice(1, 2)}
          />
        </Col>
        <Col sm="2">
          <Form.Control
            type="text"
            id="accountName"
            placeholder="예금주명"
            defaultValue={(shopBankAccount || "").split(" ").slice(2, 3)}
          />
        </Col>
      </Form.Group>
    </>
  );
};

export default SellPageForm;
