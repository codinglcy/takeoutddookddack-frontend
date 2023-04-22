import BuypageList from "../Components/BuypageList";
import { useEffect } from "react";

const BuypageListPage = (props) => {
  useEffect(() => {
    props.isBuyPageFunc(true);
    props.whatPageFunc("BuypageListPage");
  }, [props]);

  return (
    <div className="Pages">
      <BuypageList />
    </div>
  );
};

export default BuypageListPage;
