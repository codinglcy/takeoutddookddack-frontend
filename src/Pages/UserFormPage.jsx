import { useParams } from "react-router-dom";
import Register from "../Components/Register";
import { useEffect } from "react";

const UserFormPage = (props) => {
  const newedit = useParams().newedit;

  useEffect(() => {
    props.isBuyPageFunc(false);
    props.whatPageFunc("UserFormPage");
  }, [props]);

  return (
    <div className="Pages">
      <Register newedit={newedit} getPageDataFunc={props.getPageDataFunc} />
    </div>
  );
};

export default UserFormPage;
