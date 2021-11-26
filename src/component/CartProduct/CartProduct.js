import React  from "react";
import "./cardproduct.css";


const CardProduct = (props) => {

    const openModal = () => {
        props.isModalDeleteOpen((prev) => !prev)
    }
    const handleDelete = (callback,data) => {
        props.getDataForModal({
            id : data.id,
            name : data.name,
            url_img : data.url_img,
            size : data.size,
            stok : data.stok,
        })
        callback()
    }
    return (
            <div className = "admin-show-all-product">
                {
                    props.dataProduct.map((item) => {
                        
                        const productData = item
                        
                        
                        return (
                            <div className = "cart-container" key = {productData.id}>
                                <div className = "cart-img-container">
                                    <img className = "cart-img" src = {productData.url_img} alt ="img-cart" />
                                </div>
                                <div className = "cart-heading-container">
                                    <h4 className = "cart-heading get-padding">{productData.name}</h4>

                                </div>
                                <div className = "cart-info-container get-padding">
                                    <p className = "cart-info-price">Rp{new Intl.NumberFormat(['ban', 'id']).format(productData.price)}</p>
                                    <p className = "cart-info-available">Stok <b className = "cart-info-stok">{productData.stok}</b></p>
                                </div>
                                <div className = "cart-btn-container ">
                                    <div className = "cart-btn-edit btn-cart">Edit</div>
                                    <div className = "cart-btn-vertical-line"></div>
                                    <div className = "cart-btn-delete btn-cart" onClick = {() => handleDelete(openModal,productData) }>Hapus</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    )
   
}

export default CardProduct