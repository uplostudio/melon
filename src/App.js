import { useState } from "react";
import AddProduct from "./AddProduct";
import Auth from "./Auth";
import "./styles.css";


export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="App">
      {isAuth ? <AddProduct /> : <Auth setIsAuth={setIsAuth} />}
    </div>
  );
}
