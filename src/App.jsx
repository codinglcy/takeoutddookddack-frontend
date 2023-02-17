import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [hello, setHello] = useState("");

  useEffect(() => {
    axios
      .get("/api/hello")
      .then((res) => setHello(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src="./logo512.png" className="App-logo" alt="logo" />
        <div>{hello}</div>
      </header>
    </div>
  );
}

export default App;
