import React, { useState } from 'react'
import './modaldelete.css'

const ModalDelete = (props) => {
    

   

    const handleSubmit = (id) => {
        props.deleteProduct(id)
        props.isModalDeleteOpen((prev) => !prev)
        props.isPopupDeleteProductOpen((prev) => !prev)
    }


    return(
        <div className = "modaldelete-container">
            <div className = "modaldelete-centre">
                <h4>Yakin untuk menghapus Produk Ini?</h4>
                <div className = "delete-product-container">
                    <div className = "delete-product-img-container">
                        <img className = "delete-product-img" src = {props.dataProduct.url_img} alt = "delete-product"/>
                    </div>
                    <div className = "delete-product-info-container">
                        <div className ="delete-product-heading-container">
                            <p className = "delete-product-heading">{props.dataProduct.name}</p>
                        </div>
                        <div className = "delete-product-stok-container">
                            <p className = "delete-product-stok">Stok : {props.dataProduct.stok}</p>
                        </div>
                        <div className = "delete-product-size-container">
                            <p className = "delete-product-size">Berat : {props.dataProduct.size}gr</p>
                        </div>
                    </div>
                </div>
                <div className = "btn-delete-container">
                    <button className = "btn-delete btn-delete-back"
                            onClick = {() => props.isModalDeleteOpen((prev) => !prev)}
                    
                    >Kembali</button>
                    <button className = "btn-delete btn-delete-submit" 
                            onClick = {() => handleSubmit(props.dataProduct.id)}
                    >Hapus</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete