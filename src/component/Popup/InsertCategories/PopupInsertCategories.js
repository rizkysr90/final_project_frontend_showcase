import React from "react";
import './PopupInsertCategories.css';

const PopupInsertCategories = (props) => {
    return(
        <div className = "p-insert-categories-container">
            <p className = "p-insert-categories-title">Tambah Kategoriy</p>
            <p className = "p-insert-categories-status">Status : 
                    {props.loading ? 
                    <span className = "p-insert-categories-status-val">Sedang diproses</span> : props.error ? 
                    <span className = "p-insert-categories-status-val">Gagal Update</span> : 
                    <span className = "p-insert-categories-status-val">Sukses</span> }
            </p>
            <div className = "p-insert-categories-close" onClick = {() => props.close((prev) => !prev)}>Close</div>
        </div>
    )
}

export default PopupInsertCategories