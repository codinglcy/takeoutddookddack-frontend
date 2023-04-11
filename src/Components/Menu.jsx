import { useEffect, useState } from "react";
import "./css/Menu.css";
import axiosApi from "../Util/api";
import { Button } from "react-bootstrap";

const Menu = (props) => {
  const [menuList, setMenuList] = useState();
  const sellerId = props.sellerId;

  useEffect(() => {
    axiosApi.get(`/api/shop/url?sellerId=${sellerId}`).then((res) => {
      console.log(res.data);
      setMenuList(res.data.menu);
    });
  }, [sellerId]);

  return (
    <>
      <div>주문뚝딱 메뉴</div>
      <div className="menuBox">
        <div className="menuTitle">메뉴판</div>
        <div className="listBox">
          <table className="table">
            <colgroup>
              <col width="50%" />
              <col width="30%" />
              <col width="20%" />
            </colgroup>
            <thead>
              <tr>
                <th>메뉴명</th>
                <th>가격</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="listBody">
              {menuList &&
                menuList.map((menu) => {
                  return (
                    <tr key={menu.item}>
                      <td>
                        <input id={menu.item} readOnly value={menu.item} />
                      </td>
                      <td>
                        <input
                          id={`${menu.item}-price`}
                          readOnly
                          value={menu.price}
                        />
                      </td>
                      <td>
                        {props.selectMenu.includes(menu) ? (
                          <Button
                            id={`${menu.item}-btn`}
                            variant="outline-secondary"
                            disabled={true}
                            onClick={() => {
                              props.selectMenuFunc(menu);
                            }}
                          >
                            담기
                          </Button>
                        ) : (
                          <Button
                            id={`${menu.item}-btn`}
                            variant="outline-secondary"
                            onClick={() => {
                              props.selectMenuFunc(menu);
                            }}
                          >
                            담기
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Menu;
