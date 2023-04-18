import "./css/StatusType.css";

const StatusType = (props) => {
  const setStatus = (value) => {
    props.statusFunc(value);
  };
  return (
    <>
      <div>주문뚝딱 주문건 상태 종류</div>
      <button onClick={() => setStatus("All")}>전체 보기</button>
      <button onClick={() => setStatus("New")}>새주문</button>
      <button onClick={() => setStatus("Check")}>입금확인</button>
      <button onClick={() => setStatus("Ready")}>준비완료</button>
    </>
  );
};

export default StatusType;
