import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://ec2-15-165-21-12.ap-northeast-2.compute.amazonaws.com",
});

export default axiosApi;
