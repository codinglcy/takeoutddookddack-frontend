import SellPageForm from "../Components/SellPageForm";
import { useEffect } from "react";

const SellpageFormPage = (props) => {
  useEffect(() => {
    props.isBuyPageFunc(false);
    props.whatPageFunc("SellpageFormPage");
  }, [props]);

  return (
    <div className="Pages">
      <SellPageForm getPageDataFunc={props.getPageDataFunc} />
    </div>
  );
};

export default SellpageFormPage;
