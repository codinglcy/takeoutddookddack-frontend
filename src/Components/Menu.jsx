import { useEffect, useState } from "react";
import "./css/Menu.css";
import axiosApi from "../Util/api";
import { Button } from "react-bootstrap";
import useDidMountEffect from "../Util/useDidMountEffect";

const Menu = (props) => {
  const [menuList, setMenuList] = useState();
  const [selectedMenuItem, setSelectedMenuItem] = useState([]);

  useEffect(() => {
    axiosApi.get(`/api/shop/order?sellerId=${props.sellerId}`).then((res) => {
      console.log(res.data);
      setMenuList(res.data.menu);
    });
  }, [props.sellerId]);

  useDidMountEffect(() => {
    let list = [];
    props.selectMenu.map((menu) => {
      return list.push(menu.item);
    });
    setSelectedMenuItem(list);
  }, [props.selectMenu]);

  return (
    <div className="menuComponentDiv">
      <div className="menuTitle">메뉴판</div>
      <div className="menulistBox">
        <table className="table">
          <colgroup>
            <col width="200px" />
            <col width="100px" />
            <col width="70px" />
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
                      {selectedMenuItem.includes(menu.item) ? (
                        <Button
                          id={`${menu.item}-btn`}
                          variant="outline-secondary"
                          disabled={true}
                        >
                          담기
                        </Button>
                      ) : (
                        <Button
                          id={`${menu.item}-btn`}
                          variant="outline-secondary"
                          onClick={() => {
                            props.selectMenuPlusFunc({
                              item: menu.item,
                              price: menu.price,
                              quantity: 1,
                            });
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
  );
};

export default Menu;
