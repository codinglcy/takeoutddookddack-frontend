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
import debounceFunc from "../Util/debounce";

const SellPageForm = (props) => {
  const [show, setShow] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [sellerShopInfo, setSellerShopInfo] = useState({});
  const [shopMenu, setShopMenu] = useState([]);
  const [shopLocation, setShopLocation] = useState({});
  const [shopBankAccount, setShopBankAccount] = useState({});
  const [shopData, setShopData] = useState({
    id: "",
    location: ["", ""],
    bankAccount: ["", "", ""],
    menu: false,
  });

  const doApi = () => {
    axiosApi
      .get("/api/shop", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setSellerShopInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        setAccessToken(getAccessToken());
      });
  };

  const changeValueFunc = debounceFunc((what, index, value) => {
    setShopData((current) => {
      let newData = { ...current };
      let newList = [...current[what]];

      newList[index] = value;
      newData[what] = newList;
      return newData;
    });
  }, 600);

  useEffect(() => {
    setAccessToken(getAccessToken());
  }, []);

  useDidMountEffect(() => {
    doApi();
  }, [accessToken]);

  useDidMountEffect(() => {
    let location = sellerShopInfo.location
      ? [sellerShopInfo.location.address, sellerShopInfo.location.more]
      : ["", ""];
    let bankAccount = sellerShopInfo.bankAccount
      ? [
          sellerShopInfo.bankAccount.bank,
          sellerShopInfo.bankAccount.accountNum,
          sellerShopInfo.bankAccount.name,
        ]
      : ["", "", ""];

    setShopMenu(sellerShopInfo.menu);
    setShopLocation(location);
    setShopBankAccount(bankAccount);

    setShopData((current) => {
      let newData = { ...current };

      newData["location"] = location;
      newData["bankAccount"] = bankAccount;
      newData["id"] = sellerShopInfo.id;
      return newData;
    });
  }, [sellerShopInfo]);

  useDidMountEffect(() => {
    if (shopMenu && shopMenu.length < 1) {
      setShopData((current) => {
        let newData = { ...current };
        newData["menu"] = false;
        return newData;
      });
    } else {
      setShopData((current) => {
        let newData = { ...current };
        newData["menu"] = true;
        return newData;
      });
    }
  }, [shopMenu]);

  useDidMountEffect(() => {
    props.getPageDataFunc(shopData);
  }, [shopData]);

  return (
    <div className="sellpageFormDiv">
      <Form.Group as={Row} className="mb-3" controlId="pageUrl">
        <Form.Label column sm="3">
          페이지 url
        </Form.Label>
        <Col sm="9">
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
        <Form.Label column sm="3">
          메뉴
        </Form.Label>
        <div className="flexRowDiv">
          <Col sm="4">
            <Form.Control type="text" placeholder="메뉴명" id="plusMenuItem" />
          </Col>
          <Col sm="3">
            <Form.Control type="text" placeholder="가격" id="plusMenuPrice" />
          </Col>
          <Col sm="2">
            <Button
              variant="outline-secondary"
              id="button-addon2"
              style={{ margin: "0px 25%" }}
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
        </div>
      </Form.Group>

      <div className="menuList">
        {shopMenu &&
          shopMenu.map((menu) => {
            return (
              <div key={`${menu.item}-div`}>
                <input
                  key={menu.item}
                  className="menuItem"
                  readOnly
                  defaultValue={menu.item}
                  id={menu.item}
                />
                <input
                  key={`${menu.item}-price`}
                  className="menuPrice"
                  readOnly
                  defaultValue={menu.price}
                />
                <Button
                  key={`${menu.item}-btn`}
                  variant="outline-secondary"
                  id="button-addon2"
                  className="menuDeleteBtn"
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
        <Form.Label column sm="3">
          가게 위치
        </Form.Label>
        <div className="flexRowDiv">
          <Col>
            <InputGroup className="mb-3">
              <Form.Control
                id="address"
                type="text"
                readOnly
                placeholder="근처 건물 주소"
                defaultValue={shopLocation[0]}
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
        </div>
        <Modal show={show} onHide={() => setShow(false)} keyboard={false}>
          <DaumPostCode
            autoClose
            onComplete={(data) => {
              document.getElementById("address").value = data.jibunAddress;
              changeValueFunc("location", 0, data.jibunAddress);
              setShow(false);
            }}
          />
        </Modal>
        <Col sm="4">
          <Form.Control
            type="text"
            id="addressMore"
            placeholder="상세 (ex: 앞 / 맞은편)"
            defaultValue={shopLocation[1]}
            onChange={(e) => {
              changeValueFunc("location", 1, e.target.value);
            }}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
          입금 받을 계좌
        </Form.Label>
        <div className="flexRowDiv">
          <Col sm="2">
            <Form.Control
              type="text"
              id="bank"
              placeholder="은행"
              defaultValue={shopBankAccount[0]}
              onChange={(e) => {
                changeValueFunc("bankAccount", 0, e.target.value);
              }}
            />
          </Col>
          <Col sm="5">
            <Form.Control
              type="text"
              id="accountNum"
              placeholder="계좌번호"
              defaultValue={shopBankAccount[1]}
              onChange={(e) => {
                changeValueFunc("bankAccount", 1, e.target.value);
              }}
            />
          </Col>
          <Col sm="2">
            <Form.Control
              type="text"
              id="accountName"
              placeholder="예금주명"
              defaultValue={shopBankAccount[2]}
              onChange={(e) => {
                changeValueFunc("bankAccount", 2, e.target.value);
              }}
            />
          </Col>
        </div>
      </Form.Group>
    </div>
  );
};

export default SellPageForm;
