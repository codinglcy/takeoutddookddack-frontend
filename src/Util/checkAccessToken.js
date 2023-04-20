import axiosApi from "./api";

const getAccessToken = () => {
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  if (accessToken == null) {
    alert("로그인 해주세요.");
    localStorage.clear();
    window.location.href = "/";
    return null;
  }

  axiosApi
    .get("/api/seller/checkAccessToken", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      console.log(res.data, accessToken);
    })
    .catch((err) => {
      console.log("err", err);
      axiosApi
        .get(`/api/seller/checkRefreshToken?token=${refreshToken}`)
        .then((res) => {
          console.log("refresh", res);
          accessToken = res.data.accessToken;
          refreshToken = res.data.refreshToken;
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        })
        .catch((err) => {
          console.log("err", err);
          alert("로그인 해주세요.");
          localStorage.clear();
          window.location.href = "/";
        });
    });

  return accessToken;
};

export default getAccessToken;
