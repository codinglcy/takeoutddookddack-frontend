import { useParams } from "react-router-dom";
import Register from "../Components/Register";
import { useEffect } from "react";

const UserFormPage = (props) => {
  const newedit = useParams().newedit;
  console.log(newedit);

  useEffect(() => {
    props.isBuyPageFunc(false);
  }, [props]);

  return (
    <div className="Pages">
      <div>판매뚝딱 판매자 회원가입/정보수정 폼 페이지입니다.</div>
      <Register newedit={newedit} />
    </div>
  );
};

export default UserFormPage;
