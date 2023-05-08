import "./css/Register.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axiosApi from "../Util/api";
import getAccessToken from "../Util/checkAccessToken";
import useDidMountEffect from "../Util/useDidMountEffect";
import debounceFunc from "../Util/debounce";

const Register = (props) => {
  const [token, setToken] = useState("");
  const [seller, setSeller] = useState({});
  const [idCheck, setIdCheck] = useState(false);
  const [userData, setUserData] = useState({
    idCheck: idCheck,
    sellerId: "",
    pwd: "",
    pwdCheck: true,
    name: "",
    email: "",
  });

  const doApi = () => {
    axiosApi
      .get("/api/seller", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSeller(res.data);
      })
      .catch((err) => {
        console.log(err);
        setToken(getAccessToken());
      });
  };

  const changeValueFunc = debounceFunc((what, value) => {
    setUserData((current) => {
      let newData = { ...current };

      if (what === "pwdCheck") {
        newData[what] = document.getElementById("password").value === value;
      } else if (what === "pwd") {
        newData[what] = value;
        newData["pwdCheck"] =
          document.getElementById("checkPW").value === value;
      } else {
        newData[what] = value;
      }

      return newData;
    });
  }, 600);

  useEffect(() => {
    setUserData((current) => {
      let newData = { ...current };
      newData["newedit"] = props.newedit;
      return newData;
    });
    if (props.newedit === "edit") {
      setIdCheck(true);
      setToken(getAccessToken());
    }
  }, [props.newedit]);

  useDidMountEffect(() => {
    doApi();
  }, [token]);

  useDidMountEffect(() => {
    setUserData((current) => {
      let newData = { ...current };
      newData["idCheck"] = idCheck;
      return newData;
    });
  }, [idCheck]);

  useDidMountEffect(() => {
    setUserData((current) => {
      let newData = { ...current };
      newData["sellerId"] = seller.sellerId;
      newData["name"] = seller.name;
      newData["email"] = seller.email;
      return newData;
    });
  }, [seller]);

  useDidMountEffect(() => {
    props.getPageDataFunc(userData);
  }, [userData]);

  return (
    <div className="registerForm">
      <InputGroup className="mb-3">
        <FloatingLabel controlId="id" label="ID(아이디)">
          <Form.Control
            type="text"
            placeholder="id"
            defaultValue={seller.sellerId || ""}
            onChange={(e) => {
              setIdCheck(false);
              changeValueFunc("sellerId", e.target.value);
            }}
          />
        </FloatingLabel>
        <Button
          variant="outline-secondary"
          id="button-addon2"
          disabled={idCheck}
          onClick={() => {
            axiosApi
              .get(
                `/api/seller/idCheck?sellerId=${
                  document.getElementById("id").value
                }`
              )
              .then((res) => {
                alert(res.data.message);
                setIdCheck(true);
              });
          }}
        >
          중복체크
        </Button>
      </InputGroup>
      <FloatingLabel
        controlId="password"
        label="Password(비밀번호)"
        className="mb-3"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            changeValueFunc("pwd", e.target.value);
          }}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="checkPW"
        label="Check Password(비밀번호 확인)"
        className="mb-3"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            changeValueFunc("pwdCheck", e.target.value);
          }}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="email"
        label="Email address(이메일)"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          defaultValue={seller.email || ""}
          onChange={(e) => {
            changeValueFunc("email", e.target.value);
          }}
        />
      </FloatingLabel>
      <FloatingLabel controlId="name" label="Name(성명)" className="mb-3">
        <Form.Control
          type="text"
          placeholder="name"
          defaultValue={seller.name || ""}
          onChange={(e) => {
            changeValueFunc("name", e.target.value);
          }}
        />
      </FloatingLabel>
    </div>
  );
};

export default Register;
