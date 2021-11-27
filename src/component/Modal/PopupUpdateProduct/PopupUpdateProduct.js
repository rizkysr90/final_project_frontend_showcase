import React from 'react';
import "./notifinsert.css"

const PopupUpdateProduct = (props) => {
    return(
        <div onClick = {() => props.close()} className = "p-update-product-overlay">
            <div className = "p-update-product-container">
                <p className = "p-update-product-title">Edit Produk</p>
                <p className = "p-update-product-status">Status : 
                        {props.statusLoading ? 
                        <span className = "p-update-product-status-val"> Sedang diproses</span> : props.statusError ? 
                        <span className = "p-update-product-status-val"> Gagal Update</span> : 
                        <span className = "p-update-product-status-val"> Sukses</span> }
                </p>
                {props.statusLoading ? "" : props.statusError ? "" :
                <div className = "p-update-product-message">Produk ID : <span className = "p-update-product-added">{props.statusData.update_products_by_pk.id}</span></div>
                 }
            </div>
        </div>
    )
}

export default PopupUpdateProduct