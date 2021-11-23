import React from 'react';
import "./notifInsert.css"

const PopupInsertCategory = (props) => {
    return(
        <div onClick = {() => props.close((prev) => !prev)} className = "p-insert-categories-overlay">
            <div className = "p-insert-categories-container">
                <p className = "p-insert-categories-title">Tambah Kategori</p>
                <p className = "p-insert-categories-status">Status : 
                        {props.statusLoading ? 
                        <span className = "p-insert-categories-status-val"> Sedang diproses</span> : props.statusError ? 
                        <span className = "p-insert-categories-status-val"> Gagal Update</span> : 
                        <span className = "p-insert-categories-status-val"> Sukses</span> }
                </p>
                {props.statusLoading ? "" : props.statusError ? "" :
                <div className = "p-insert-categories-message">Kategori Baru : <span className = "p-insert-categories-added">{props.statusData.insert_categories_one.title}</span></div>
                 }
            </div>
        </div>
    )
}

export default PopupInsertCategory