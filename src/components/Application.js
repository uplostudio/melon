import "../styles.css";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

import List from "./List";

const supabase = createClient(
    "https://agnyesdxzgsszjbvwekd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbnllc2R4emdzc3pqYnZ3ZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NTY1NTIsImV4cCI6MjAxNzUzMjU1Mn0.EB8MdBUJcRbnLLE5TnOhsVbHQD3FHPnE3a-DlDG9jhw"
);

export default function Application() {
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

    async function getUsers() {
        let { data: Users, error } = await supabase
            .from("Users")
            .select("*")
            .order('id', { ascending: true });
        setUsers(Users);
        setUser(Users?.[0]?.name);
    }

    async function getLocations() {
        let { data: Locations, error } = await supabase
            .from("Locations")
            .select("*")
            .order('id', { ascending: true });
        setLocations(Locations);
    }

    async function getMagazines() {
        let { data: Magazines, error } = await supabase
            .from("Magazines")
            .select("*")
            .order('id', { ascending: true });
        setMagazines(Magazines);
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

    const [users, setUsers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [magazines, setMagazines] = useState([]);
    const [productName, setProductName] = useState("");
    const [idtw, setIdtw] = useState("");
    const [user, setUser] = useState("");
    const [tab, setTab] = useState(1);

    const userRef = useRef();
    const magazineRef = useRef();
    const productIdRef = useRef();
    const amountRef = useRef();
    const locationRef = useRef();

    useEffect(() => {
        getUsers();
        getLocations();
        getMagazines();
    }, []);


    return (
        <div>

            <div className={"tab" + (tab === 1 ? " is-active" : "")} onClick={() => setTab(1)}>Dane</div>
            <div className={"tab" + (tab === 2 ? " is-active" : "")} onClick={() => setTab(2)}>Skanuj produkt</div>
            <div className={"tab" + (tab === 3 ? " is-active" : "")} onClick={() => setTab(3)}>Lista towarów</div>

            <div className={"tab-panel" + (tab === 1 ? " is-active" : "")}>
                <h1 onClick={getProduct}>Dane</h1>
                <div className="label">Użytkownik</div>
                <select ref={userRef} onChange={() => setUser(userRef.current.value)}>
                    {users.map((user) => (
                        <option key={user.id}>{user.name}</option>
                    ))}
                </select>
                <div style={{ height: "24px" }}></div>

                <div className="label">Magazyn</div>
                <select ref={magazineRef}>
                    {magazines.map((magazine) => (
                        <option key={magazine.id}>{magazine.name}</option>
                    ))}
                </select>
                <div style={{ height: "24px" }}></div>

                <div className="label">Sekcja</div>


                <select ref={locationRef}>
                    {locations.map((location) => (
                        <option key={location.id}>{location.name}</option>
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
