import "./styles.css";
import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

import { usersList } from "./const/usersList02";
import { magazinesList } from "./const/magazinesList02";
import { locationsList } from "./const/locationsList02";

import List from "./List";

const supabase = createClient(
    "https://agnyesdxzgsszjbvwekd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbnllc2R4emdzc3pqYnZ3ZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NTY1NTIsImV4cCI6MjAxNzUzMjU1Mn0.EB8MdBUJcRbnLLE5TnOhsVbHQD3FHPnE3a-DlDG9jhw"
);

export default function AddProduct() {
    async function insertRow(event) {
        event.preventDefault();

        if (amountRef.current.value !== "" && productIdRef.current.value !== "") {
            await getProduct();
            const { data, error } = await supabase
                .from("Rows")
                .insert([
                    {
                        user: userRef.current.value,
                        magazine: magazineRef.current.value,
                        location: locationRef.current.value,
                        product_id: productIdRef.current.value,
                        product_name: productName,
                        idtw: idtw,
                        amount: amountRef.current.value,
                    },
                ])
                .select();
            productIdRef.current.value = "";
            amountRef.current.value = "";
            productIdRef.current.focus();
            setProductName("");
        }
    }

    async function getProduct() {
        let { data: Items, error } = await supabase
            .from("Items")
            .select("*")
            .eq("product_id", productIdRef.current.value);
        setProductName(Items?.[0]?.name);
        setIdtw(Items?.[0]?.idtw)
    }

    async function getProductAndNumber() {
        let { data: Items, error } = await supabase
            .from("Items")
            .select("*")
            .eq("product_id", productIdRef.current.value);

        setProductName(Items?.[0]?.name);
        setIdtw(Items?.[0]?.idtw)

        if (!isNaN(Items?.[0]?.amount) && productIdRef.current.value.charAt(0) === "2") {
            amountRef.current.value = Items?.[0]?.amount;
        }
    }

    const [productName, setProductName] = useState("");
    const [idtw, setIdtw] = useState("");
    const [user, setUser] = useState(usersList[0]);
    const [tab, setTab] = useState(1);

    const userRef = useRef();
    const magazineRef = useRef();
    const productIdRef = useRef();
    const amountRef = useRef();
    const locationRef = useRef();

    return (
        <div>

            <div className={"tab" + (tab === 1 ? " is-active" : "")} onClick={() => setTab(1)}>Dane</div>
            <div className={"tab" + (tab === 2 ? " is-active" : "")} onClick={() => setTab(2)}>Skanuj produkt</div>
            <div className={"tab" + (tab === 3 ? " is-active" : "")} onClick={() => setTab(3)}>Lista towarów</div>

            <div className={"tab-panel" + (tab === 1 ? " is-active" : "")}>
                <h1 onClick={getProduct}>Dane</h1>
                <div className="label">Użytkownik</div>
                <select ref={userRef} onChange={() => setUser(userRef.current.value)}>
                    {usersList.map((user) => (
                        <option key={user}>{user}</option>
                    ))}
                </select>
                <div style={{ height: "24px" }}></div>

                <div className="label">Magazyn</div>
                <select ref={magazineRef}>
                    {magazinesList.map((magazine) => (
                        <option key={magazine}>{magazine}</option>
                    ))}
                </select>
                <div style={{ height: "24px" }}></div>

                <div className="label">Sekcja</div>


                <select ref={locationRef}>
                    {locationsList.map((location) => (
                        <option key={location}>{location}</option>
                    ))}
                </select>


                <div style={{ height: "24px" }}></div>
            </div>


            <div className={"tab-panel" + (tab === 2 ? " is-active" : "")}>

                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="label">Produkt</span>
                    <input onKeyDown={(e) => { e.target.keyCode === 13 && e.preventDefault(); }} ref={productIdRef} onChange={getProductAndNumber} />
                </div>
                <div style={{ height: "6px" }}></div>
                <div>{productName}</div>
                <div style={{ height: "6px" }}></div>

                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="label">Ilość</span>
                    <input type="number" step="any" ref={amountRef} onChange={getProduct} />
                </div>
                <div style={{ height: "8px" }}></div>

                <button onClick={insertRow}>Dodaj</button>
            </div>

            <div className={"tab-panel" + (tab === 3 ? " is-active" : "")}>
                <List user={user} tab={tab} />
            </div>


        </div>
    );
}
