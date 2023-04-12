import SellPageForm from "../Components/SellPageForm";
import { useEffect } from "react";

const SellpageFormPage = (props) => {
  useEffect(() => {
    props.isBuyPageFunc(false);
  }, [props]);

  return (
    <div className="Pages">
      <div>판매뚝딱 판매자 페이지 생성/수정 폼 페이지입니다.</div>
      <SellPageForm />
    </div>
  );
};

export default SellpageFormPage;
