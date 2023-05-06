import axios from "axios";
import { useEffect, useState } from "react";
import useDidMountEffect from "../Util/useDidMountEffect";
import "./css/SearchByAddress.css";
import { Button } from "react-bootstrap";
import axiosApi from "../Util/api";

const SearchByAddress = ({ shopListFunc }) => {
  const [firstList, setFirstList] = useState();
  const [first, setFirst] = useState({
    code: "",
    name: "",
  });
  const [secondList, setSecondList] = useState();
  const [second, setSecond] = useState({
    code: "",
    name: "",
  });
  const [thirdList, setThirdList] = useState();
  const [third, setThird] = useState({
    code: "",
    name: "",
  });

  useEffect(() => {
    axios
      .get(
        "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000"
      )
      .then((res) => {
        setFirstList(res.data.regcodes);
      })
      .catch((err) => console.log(err));
  }, []);

  useDidMountEffect(() => {
    axios
      .get(
        `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${first.code}*00000&is_ignore_zero=true`
      )
      .then((res) => {
        setSecondList(res.data.regcodes);
      })
      .catch((err) => console.log(err));
  }, [first]);

  useDidMountEffect(() => {
    axios
      .get(
        `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${second.code}*00&is_ignore_zero=true`
      )
      .then((res) => {
        setThirdList(res.data.regcodes);
      })
      .catch((err) => console.log(err));
  }, [second]);

  const doSearch = () => {
    const no2 = ["충청", "전라", "경상"];
    let firstSlice = first.name.slice(0, 2);
    if (no2.includes(firstSlice)) {
      firstSlice = first.name.slice(0, 1) + first.name.slice(2, 3);
    }

    axiosApi
      .get(
        `/api/shop/location?first=${firstSlice}&second=${second.name}&third=${third.name}`
      )
      .then((res) => {
        shopListFunc(res.data);
      });
  };

  return (
    <div className="SearchByAddressDiv">
      <select
        name="시/도"
        defaultValue={first.name}
        onChange={(e) => {
          setFirst({
            code: e.target.value.slice(0, 2),
            name: e.target.options[e.target.selectedIndex].text,
          });
          setSecondList();
          setSecond({
            code: "",
            name: "",
          });
          setThirdList();
          setThird({
            code: "",
            name: "",
          });
        }}
      >
        <option value="" key="none" hidden>
          시/도
        </option>
        {firstList &&
          firstList.map((item) => {
            return (
              <option value={item.code} key={item.code}>
                {item.name}
              </option>
            );
          })}
      </select>

      <select
        name="시/구/군"
        defaultValue={second.name}
        onChange={(e) => {
          setSecond({
            code: e.target.value.slice(0, 5),
            name: e.target.options[e.target.selectedIndex].text,
          });
          setThirdList();
          setThird({
            code: "",
            name: "",
          });
        }}
      >
        <option value="" key="none" hidden>
          시/구/군
        </option>
        {secondList &&
          secondList.map((item) => {
            return (
              <option value={item.code} key={item.code}>
                {item.name.split(" ")[1]}
                {item.name.split(" ")[2]
                  ? " " + item.name.split(" ")[2]
                  : undefined || ""}
              </option>
            );
          })}
      </select>

      <select
        name="동/읍/면"
        defaultValue={third.name}
        onChange={(e) => {
          setThird({
            code: e.target.value.slice(0, 8),
            name: e.target.options[e.target.selectedIndex].text,
          });
        }}
      >
        <option value="" key="none" hidden>
          동/읍/면
        </option>
        {thirdList &&
          thirdList.map((item) => {
            return (
              <option value={item.code} key={item.code}>
                {item.name.split(" ")[3]
                  ? item.name.split(" ")[3]
                  : item.name.split(" ")[2]}
              </option>
            );
          })}
      </select>
      <Button variant="outline-secondary" id="button-addon2" onClick={doSearch}>
        검색
      </Button>
    </div>
  );
};

export default SearchByAddress;
