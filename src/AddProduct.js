import "./styles.css";
import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

import List from "./List";

const supabase = createClient(
    "https://agnyesdxzgsszjbvwekd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbnllc2R4emdzc3pqYnZ3ZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NTY1NTIsImV4cCI6MjAxNzUzMjU1Mn0.EB8MdBUJcRbnLLE5TnOhsVbHQD3FHPnE3a-DlDG9jhw"
);

export default function AddProduct() {
    async function insertRow(event) {
        event.preventDefault();
        const { data, error } = await supabase
            .from("Rows")
            .insert([
                {
                    user: userRef.current.value,
                    magazine: magazineRef.current.value,
                    location: locationRef.current.value,
                    product_id: productIdRef.current.value,
                    product_name: productName,
                    amount: amountRef.current.value,
                },
            ])
            .select();
        productIdRef.current.value = "";
        amountRef.current.value = "";
        productIdRef.current.focus();
        setProductName("");
    }

    async function getProduct() {
        let { data: Products, error } = await supabase
            .from("Products")
            .select("*")
            .eq("product_id", productIdRef.current.value);
        setProductName(Products?.[0]?.name);
    }

    const [productName, setProductName] = useState("");
    const [user, setUser] = useState("");
    const [tab, setTab] = useState(1);

    const userRef = useRef();
    const magazineRef = useRef();
    const productIdRef = useRef();
    const amountRef = useRef();
    const locationRef = useRef();

    return (
        <form onSubmit={insertRow}>

            <div className={"tab" + (tab === 1 ? " is-active" : "")} onClick={() => setTab(1)}>Dane</div>
            <div className={"tab" + (tab === 2 ? " is-active" : "")} onClick={() => setTab(2)}>Skanuj produkt</div>
            <div className={"tab" + (tab === 3 ? " is-active" : "")} onClick={() => setTab(3)}>Lista towarów</div>

            <div className={"tab-panel" + (tab === 1 ? " is-active" : "")}>
                <h1 onClick={getProduct}>Dane</h1>
                <div className="label">Użytkownik</div>
                <select ref={userRef} onChange={() => setUser(userRef.current.value)}>
                    <option>---</option>
                    <option>User 1</option>
                    <option>User 2</option>
                    <option>User 3</option>
                </select>
                <div style={{ height: "24px" }}></div>

                <div className="label">Magazyn</div>
                <select ref={magazineRef}>
                    <option>M60 DOBRE MIASTO SKLEP</option>
                    <option>MRDM DOBRE MIASTO MAGAZYN REKLAMACYJNY</option>
                    <option>M90 DZIAŁDOWO SKLEP</option>
                    <option>MRDZ DZIAŁDOWO MAGAZYN REKLAMACYJNY</option>
                    <option>M08 LIDZBARK WARMIŃSKI SKLEP</option>
                    <option>M88 LIDZBARK MAGAZYN MATERIAŁÓW BUDOWLANYCH</option>
                    <option>MRLW LIDZBARK WARMIŃSK MAGAZYN REKLAMACYJNY</option>
                    <option>M40 MORĄG SKLEP</option>
                    <option>MRMO MORĄG MAGAZYN REKLAMACYJNY</option>
                    <option>M70 NIDZICA SKLEP</option>
                    <option>MRNI NIDZICA MAGAZYN REKLAMACYJNY</option>
                    <option>M01 OLSZTYN SKLEP</option>
                    <option>M02 OLSZTYN MAGAZYN MATERIAŁÓW BUDOWLANYCH</option>
                    <option>M03 OLSZTYN EXPORT</option>
                    <option>M04 OLSZTYN MAGAZYN TRANZYTOWY</option>
                    <option>M05 OLSZTYN MAGAZYN NR 5</option>
                    <option>M06 OLSZTYN MAGAZYN NR 6</option>
                    <option>M07 OLSZTYN MAGAZYN NA TOWARY SEZONOWE</option>
                    <option>M12 OLSZTYN SPRZEDAŻ INTERNETOWA</option>
                    <option>M13 OLSZTYN MAGAZYN VAN</option>
                    <option>M14 OLSZTYN MAGAZYN DEPOZYTOWY</option>
                    <option>M99 OLSZTYN MAGAZYN DZIAŁU ZAOPATRZENIA</option>
                    <option>MROL OLSZTYN MAGAZYN REKLAMACYJNY</option>
                    <option>M09 OSTRÓDA SKLEP</option>
                    <option>M10 OSTRÓDA DODATKOWY</option>
                    <option>MROS OSTRÓDA MAGAZYN REKLAMACYJNY</option>
                </select>
                <div style={{ height: "24px" }}></div>

                <div className="label">Sekcja</div>
                <select ref={locationRef}>
                    <option>Sekcja 1</option>
                    <option>Sekcja 2</option>
                    <option>Sekcja 3</option>
                </select>
                <div style={{ height: "24px" }}></div>
            </div>


            <div className={"tab-panel" + (tab === 2 ? " is-active" : "")}>
                <h1 onClick={getProduct}>Skanuj produkt</h1>
                <div className="label">Produkt</div>
                <input ref={productIdRef} onChange={getProduct} />
                <p>{productName}</p>
                <div style={{ height: "24px" }}></div>

                <div className="label">Ilość</div>
                <input ref={amountRef} />
                <div style={{ height: "24px" }}></div>

                <button>Dodaj</button>
            </div>

            <div className={"tab-panel" + (tab === 3 ? " is-active" : "")}>
                <List user={user} tab={tab} />
            </div>


        </form>
    );
}
