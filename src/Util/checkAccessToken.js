// import { useState } from "react";
import axiosApi from "./api";

const getAccessToken = () => {
  // const [accessToken, setAccessToken] = useState(
  //   localStorage.getItem("accessToken")
  // );
  // const [refreshToken, setRefreshToken] = useState(
  //   localStorage.getItem("refreshToken")
  // );
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  try {
    axiosApi
      .get("api/seller/checkAccessToken", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        return accessToken;
      })
      .catch((err) => {
        console.log(err);
        axiosApi
          .get(`/api/seller/checkRefreshToken?token=${refreshToken}`)
          .then((res) => {
            console.log(res);
            accessToken = res.data.accessToken;
            refreshToken = res.data.refreshToken;
            localStorage.setItem("refreshToken", refreshToken);
          })
          .catch((err) => {
            console.log(err);
            alert("재로그인 해주세요.");
          });
      });
    return accessToken;
  } catch (err) {
    console.log(err);
  }
};

export default getAccessToken;
