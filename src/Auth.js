import "./styles.css";
import { useRef, useState } from "react";

export default function Auth({ setIsAuth }) {
    const passRef = useRef();

    const [error, setError] = useState("");

    function checkPass(event) {
        event.preventDefault();
        if (passRef.current.value === "1234") {
            setIsAuth(true);
        } else {
            setError("Błędne hasło");
        }
    }
    return (
        <form onSubmit={checkPass}>
            <h1>Podaj hasło</h1>
            <input ref={passRef} />
            <div style={{ height: "12px" }}></div>
            <button>Login</button>
            <div style={{ height: "8px" }}></div>
            {error}
        </form>
    );
}
