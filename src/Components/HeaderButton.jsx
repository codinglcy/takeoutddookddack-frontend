import "./css/HeaderButton.css";

const HeaderButton = (props) => {
  return (
    <>
      <button onClick={() => console.log(props.whatPage)}>
        포장뚝딱 헤더버튼
      </button>
    </>
  );
};

export default HeaderButton;
