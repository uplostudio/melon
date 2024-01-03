import { useState } from "react";

export default function DeleteRow({ deleteRow, row }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleClick() {
        setIsModalOpen(false);
        deleteRow(row.id)
    }
    return (
        <div>
            <span
                style={{ cursor: "pointer", fontSize: "10px" }}
                onClick={() => setIsModalOpen(true)}
            >
                (Usuń)
            </span>

            <div className={"delete-modal"
                + (isModalOpen ? " is-active" : "")
            }>
                <div className="delete-modal_wrapper">
                    <p>Czy chcesz usunąć ten wiersz?</p>
                    <div style={{ height: "12px" }}></div>
                    <div style={{ display: "flex", gap: "12px" }}>
                        <div
                            className="delete-modal_button"
                            onClick={handleClick}
                        >
                            Tak
                        </div>
                        <div className="delete-modal_button is-cancel"
                            onClick={() => setIsModalOpen(false)}
                        >Nie</div>
                    </div>
                </div>
            </div>
        </div>
    );
}