import "./css/StatusType.css";

const StatusType = (props) => {
  const setStatus = (value) => {
    props.statusFunc(value);
  };
  return (
    <div className="statusBtnDiv">
      <button className="statusBtns" onClick={() => setStatus("All")}>
        <div className="allBtnDiv">전체 보기</div>
      </button>
      <button className="statusBtns" onClick={() => setStatus("New")}>
        <div className="newBtnDiv">새주문</div>
      </button>
      <button className="statusBtns" onClick={() => setStatus("Check")}>
        <div className="checkBtnDiv">입금확인</div>
      </button>
      <button className="statusBtns" onClick={() => setStatus("Ready")}>
        <div className="readyBtnDiv">준비완료</div>
      </button>
    </div>
  );
};

export default StatusType;
