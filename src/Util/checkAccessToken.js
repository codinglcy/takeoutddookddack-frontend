import { useState } from "react";
import axiosApi from "./api";

const GetAccessToken = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

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
          .get("/api/seller/checkRefreshToken", {
            refreshToken: refreshToken,
          })
          .then((res) => {
            console.log(res);
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
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

export default GetAccessToken;
