import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import DeleteRow from "./DeleteRow";

// supabe client
const supabase = createClient(
    "https://dupkrmkaqmpozhleqush.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1cGtybWthcW1wb3pobGVxdXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNzEwMzksImV4cCI6MjA0Mzk0NzAzOX0.gRUV1UDv0mfx8CPZXc3C0YKRZho3qMw1R-AjXJnP9oY"
);

export default function List({ user, tab }) {
    async function getRows() {
        let { data: Rows, error } = await supabase
            .from("Rows")
            .select("*")
            .order("created_at", { ascending: false })
            .eq("user", user)
            .limit(5000);
        setRows(Rows.filter((row) => row.isDeleted !== true));
        getAllRows();
    }

    async function getAllRows() {
        let { data: Rows, error } = await supabase
            .from("Rows")
            .select("product_id, product_name, amount, user, created_at, amount_expected")
            .order("created_at", { ascending: false });
        setAllRows(Rows.filter((row) => row.isDeleted !== true));
    }

    async function deleteRow(id) {
        // const { error } = await supabase.from("Rows").update({ isDeleted: true }).eq("id", id);

        // Delete the record from Supabase
        
        const { data, error } = await supabase
            .from("Rows")
            .delete()
            .eq("id", id);
            
            
        

        getRows();
    }

    const [rows, setRows] = useState([]);
    const [allRows, setAllRows] = useState([]);

    useEffect(() => {
        if (tab === 3) {
            getRows();
        }
    }, [tab]);

    return (
        <div>
            <h1>Lista towarów</h1>

            <CSVLink filename={"lista-towarow.csv"}
                className="btn" data={allRows}>Pobierz CSV</CSVLink>




            <div style={{ height: "12px" }}></div>
            <div style={{ cursor: "pointer" }} onClick={getRows}>Odśwież</div>
            {user === "" ? <div>Wybierz użytkownika</div> : null}
            <div style={{ height: "12px" }}></div>
            <div style={{ overflow: "scroll" }}>
                <table style={{ minWidth: "600px" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa</th>
                            {/* <th>idtw</th> */}
                            <th>Ilość</th>
                            <th>Stan</th>
                            {/* <th>Magazyn</th>
                            <th>Sekcja</th> */}
                            <th>Użytkownik</th>
                            <th>Czas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    {row.product_id}
                                    <DeleteRow deleteRow={deleteRow} row={row} />
                                </td>
                                <td>{row.product_name}</td>
                                {/* <td>{row.idtw}</td> */}
                                <td>{row.amount}</td>
                                <td>{row.amount_expected}</td>
                                {/* <td>{row.magazine}</td>
                                <td>{row.location} </td> */}
                                <td>{row.user}</td>
                                <td>{row.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ height: "24px" }}></div>

        </div>
    );
}
