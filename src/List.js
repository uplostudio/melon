import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";


const supabase = createClient(
    "https://agnyesdxzgsszjbvwekd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbnllc2R4emdzc3pqYnZ3ZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NTY1NTIsImV4cCI6MjAxNzUzMjU1Mn0.EB8MdBUJcRbnLLE5TnOhsVbHQD3FHPnE3a-DlDG9jhw"
);

export default function List({ user, tab }) {
    async function getRows() {
        let { data: Rows, error } = await supabase
            .from("Rows")
            .select("*")
            .eq("user", user);
        console.log(user);
        setRows(Rows);
        console.log(Rows);
    }

    async function deleteRow(id) {
        const { error } = await supabase.from("Rows").delete().eq("id", id);
        getRows();
    }

    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (tab === 3) {
            getRows();
        }
    }, [tab]);

    return (
        <div>
            <h1>Lista towarów</h1>
            <div onClick={getRows} style={{ cursor: "pointer" }}>
                Odśwież
            </div>

            <div style={{ height: "24px" }}></div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nazwa</th>
                        <th>Ilość</th>
                        <th>Magazyn</th>
                        <th>Lokalizacja</th>
                    </tr>
                </thead>
                {rows.toReversed().map((row) => (
                    <tr key={row.id}>
                        <td>
                            {row.product_id}{" "}
                            <span
                                style={{ cursor: "pointer", fontSize: "10px" }}
                                onClick={() => deleteRow(row.id)}
                            >
                                (Usuń)
                            </span>
                        </td>
                        <td>{row.product_name}</td>
                        <td>{row.amount}</td>
                        <td>{row.magazine}</td>
                        <td>{row.location} </td>
                    </tr>
                ))}
            </table>
            <div style={{ height: "24px" }}></div>
            <CSVLink filename={"lista-towarow-" + user.replaceAll(" ", "-").toLowerCase() + ".csv"}
                className="btn" data={rows}>Pobierz CSV</CSVLink>
        </div>
    );
}
