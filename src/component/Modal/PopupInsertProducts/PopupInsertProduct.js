import React from 'react';
import "./notifinsert.css"

const PopupInsertProduct = (props) => {
    return(
        <div onClick = {() => props.close((prev) => !prev)} className = "p-insert-product-overlay">
            <div className = "p-insert-product-container">
                <p className = "p-insert-product-title">Tambah Produk</p>
                <p className = "p-insert-product-status">Status : 
                        {props.statusLoading ? 
                        <span className = "p-insert-product-status-val"> Sedang diproses</span> : props.statusError ? 
                        <span className = "p-insert-product-status-val"> Gagal Update</span> : 
                        <span className = "p-insert-product-status-val"> Sukses</span> }
                </p>
                {props.statusLoading ? "" : props.statusError ? "" :
                <div className = "p-insert-product-message">Produk Baru : <span className = "p-insert-product-added">{props.statusData.insert_products_one.name}</span></div>
                 }
            </div>
        </div>
    )
}

export default PopupInsertProduct