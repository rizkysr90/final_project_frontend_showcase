import React from 'react';
import "./notifInsert.css";

const PopupDeleteProduct = (props) => {
    return(
        <div onClick = {() => props.close((prev) => !prev)} className = "p-delete-product-overlay">
            <div className = "p-delete-product-container">
                <p className = "p-delete-product-title">Hapus Produk</p>
                <p className = "p-delete-product-status">Status : 
                        {props.statusLoading ? 
                        <span className = "p-delete-product-status-val"> Sedang diproses</span> : props.statusError ? 
                        <span className = "p-delete-product-status-val"> Gagal Hapus</span> : 
                        <span className = "p-delete-product-status-val"> Sukses</span> }
                </p>
                {props.statusLoading ? "" : props.statusError ? "" :
                <div className = "p-delete-product-message">Produk Dihapus : <span className = "p-delete-product-added">{props.statusData.delete_products_by_pk.name}</span></div>
                 }
            </div>
        </div>
    )
}

export default PopupDeleteProduct