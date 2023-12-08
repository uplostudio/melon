import { useState } from "react";
import AddProduct from "./AddProduct";
import Auth from "./Auth";
import "./styles.css";
import Logo from "./jasam.svg";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="App">
      {/* <img src={Logo} /> */}
      {isAuth ? <AddProduct /> : <Auth setIsAuth={setIsAuth} />}
    </div>
  );
}
