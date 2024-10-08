import { useState } from "react";
import Application from "./components/Application";
import Auth from "./components/Auth";
import "./styles.css";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
//
  return (
    <div className="App">
      {isAuth ? <Application /> : <Auth setIsAuth={setIsAuth} />}
    </div>
  );
}
