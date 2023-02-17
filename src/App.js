import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [hello, setHello] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://ec2-15-165-21-12.ap-northeast-2.compute.amazonaws.com/api/hello"
      )
      .then((res) => setHello(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="./logo512.png" className="App-logo" alt="logo" />
        <div>{hello}</div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
