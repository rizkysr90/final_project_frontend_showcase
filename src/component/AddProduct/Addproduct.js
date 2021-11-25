import React, { useState,useRef } from "react";
import "./addproduct.css"
import ModalCategories from "../Modal/ModalAddCategories/ModalCategories";
import PopupInsertCategory from "../Modal/PopupInsertCategory/PopupInsertCategory";
import PopupInsertProduct from "../Modal/PopupInsertProducts/PopupInsertProduct";
import { useQuery,gql, useSubscription, useMutation } from "@apollo/client";
const INSERT_PRODUCT = gql `
mutation MyMutation(
    $name: String!, 
    $size: Int!, 
    $stok: Int!, 
    $url_img: String!, 
    $price: Int!, 
    $is_promo: Boolean!, 
    $discount: Int!, 
    $description: String!, 
    $category_id: Int!) {
    insert_products_one(object: {name: $name, size: $size, stok: $stok, url_img: $url_img, price: $price, is_promo: $is_promo, discount: $discount, description: $description, category_id: $category_id}) {
      name
    }
  }
`;
const SUBS_CATEGORIES = gql`
subscription MySubscription {
    categories {
      id
      title
    }
  }
  
  
`;
const INSERT_CATEGORIES = gql `
mutation MyMutation($url_img: String!, $title: String!) {
    insert_categories_one(object: {title: $title, url_img: $url_img}) {
      title
    }
  }
  
`;

const AddProduct = () => {
    const [insertProduct,{loading:  loadingInsertProduct, error : loadingErrorProduct, data : dataInsertProduct}] = useMutation(INSERT_PRODUCT)
    const {loading : loadingCategories,error : errorCategories,data} = useSubscription(SUBS_CATEGORIES);
    const [insertCategories,{loading : loadingInsertCategories, error : loadingErrorCategories, data : dataInsertCategories}] = useMutation(INSERT_CATEGORIES)
    const [isModalCategoriesOpen,setIsModalCategoriesOpen] = useState(false);
    const [isPopupInsertCategoriesOpen,setIsPopupInsertCategoriesOpen] = useState(false);
    const [isPopupInsertProductOpen,setIsPopupInsertProductOpen] = useState(false)
    // const [promo,setPromo] = useState(false);


    const [productData,setProductData] = useState(
        {
            name : "",
            size : "",  
            stok : "",
            price : "",
            category : "",
            is_promo : false,
            promo : 0

        }
    )

    const [errorMessage,setErrorMessage] = useState(
        {
            name : "",
            size : "",  
            stok : "",
            price : "",
            promo : ""
        }
    )
    const calculatingDiscount = Number(productData.price) - (Number(productData.price) * (Number(productData.promo / 100)))
    const refProductDataDescription = useRef(null)
    const refProductDataImg = useRef(null)

    const addCategories = (admindata) => {
        insertCategories({
            variables : {
                title : admindata.name_categories,
                url_img : admindata.img_categories,
            }
        })
    }

    // const calculatingDiscount = () => {
    //     const a = Number(productData.price)
    //     const b = Number(productData.promo)
    //     const totalDiscount = a * (b / 100)
    //     if (b === 0) {
    //         return a
    //     } else {
    //         return Number(a - totalDiscount)
    //     }
    // }
    const handleChange = (e) => {
        if (e.target.name === "size" || e.target.name === "stok" || e.target.name === "price" || e.target.name === "category" || e.target.name === "promo") {
            if (e.target.value !== "") {
                const valueButNumber = Number(e.target.value)
                setProductData({...productData,[e.target.name] : valueButNumber})
            } else {
                setProductData({...productData,[e.target.name] : e.target.value})
                
            }
          
        } else {
            setProductData({...productData,[e.target.name] : e.target.value})
        }
    }
    const handleValidation = (e) => {
        const name = e.target.name
        const value = e.target.value

        if (name === "name") {
            if(value === "" ) {
                setErrorMessage({...errorMessage,[name] : "Nama produk wajib diisi"})
            } else if (value[value.length-1] === " ") {
                setErrorMessage({...errorMessage,[name] : "Nama Produk tidak boleh berakhiran spasi"})
            } else {
                setErrorMessage({...errorMessage,[name] : ""})
            }
        }
        if (name === "size") {
            if(value === "" || Number(value) === 0) {
         
                setErrorMessage({...errorMessage,[name] : "Ukuran Produk tidak boleh kosong"})
            } else if (Number(value) < 0) {
                setErrorMessage({...errorMessage,[name] : "Ukuran Produk tidak boleh negatif"})
            } else {
                setErrorMessage({...errorMessage,[name] : ""})

            }
        }
        if (name === "stok") {
            if(value === "") {
                setErrorMessage({...errorMessage,[name] : "Stok wajib diisi"})
            } else if (Number(value) < 0) {
                setErrorMessage({...errorMessage,[name] : "Stok Produk tidak boleh negatif,masa udah ilang aja produknya wkwkwk"})
            } else {
                setErrorMessage({...errorMessage,[name] : ""})

            }
        }
        if (name === "price") {
            if(value === "") {
                setErrorMessage({...errorMessage,[name] : "Harga wajib diisi"})
            } else if (Number(value) < 0 || Number(value) === 0) {
                setErrorMessage({...errorMessage,[name] : "Stok Produk tidak boleh negatif atau Rp 0,mau rugi kah?"})
            } else {
                setErrorMessage({...errorMessage,[name] : ""})

            }
        }
        if (name === "promo") {
            if(value === "") {
                setErrorMessage({...errorMessage,[name] : "Promo wajib diisi"})
            } else if (Number(value) < 0 || Number(value) === 0) {
                setErrorMessage({...errorMessage,[name] : "Promo harus lebih dari 0 % "})
            } else {
                setErrorMessage({...errorMessage,[name] : ""})

            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (errorMessage.name === "" && errorMessage.size === "" && errorMessage.stok === "" &&
            errorMessage.price === "" && errorMessage.promo === "" && productData.category !== ""
            && refProductDataImg.current.value !== "" && refProductDataDescription.current.value !== "") {

            let newData = {...productData}
            newData = {...newData,
                url_img: refProductDataImg.current.value,
                description : refProductDataDescription.current.value
            }

            insertProduct(
                {
                    variables : {
                        name : newData.name,
                        size : newData.size,
                        stok : newData.stok,
                        price : newData.price,
                        url_img : newData.url_img,
                        is_promo : newData.is_promo,
                        discount : newData.promo,
                        description : newData.description,
                        category_id : newData.category,

                    }
                }
            )
            setProductData({
                name : "",
                size : "",  
                stok : "",
                price : "",
                category : "",
                is_promo : false,
                promo : ""
            })
            refProductDataDescription.current.value = ""
            refProductDataImg.current.value = ""
            setIsPopupInsertProductOpen(true)
           


          
                
        } else {
            alert("Data produk masih ada yang belum sesuai")
            return
        }
    }
    return(
        <>
            <div className = "addProduct-container">
                <div className = "addProduct-centre">
                    <form onSubmit = {handleSubmit}>
                        <label htmlFor = "name">
                            <span className = "input-title block-label">Nama Produk</span>
                            <input type = "text" name = "name" id = "name" className = "input-large" onChange = {handleChange} value = {productData.name} 
                            onBlur = {handleValidation}></input>
                            {errorMessage.name && <p className = "add-product-errorValidation"><span>- </span>{errorMessage.name}</p>}
                        </label>
                        <label htmlFor = "size">
                            <span className = "input-title get-margin-top block-label">Berat</span>
                            <input type = "number" name = "size" id = "size" className = "input-small" onChange = {handleChange} value = {productData.size} onBlur = {handleValidation}></input>
                            <span className = "input-suffix-size">gr</span>
                            {errorMessage.size && <p className = "add-product-errorValidation"><span>- </span>{errorMessage.size}</p>}

                        </label>
                        <label htmlFor = "stok">
                            <span className = "input-title get-margin-top block-label">Stok</span>
                            <input type = "number" name = "stok" id = "stok" className = "input-small" onChange = {handleChange} value = {productData.stok} onBlur = {handleValidation}></input>
                            {errorMessage.stok && <p className = "add-product-errorValidation"><span>- </span>{errorMessage.stok}</p>}

                        </label>
                        <label htmlFor = "price">
                            <span className = "input-title get-margin-top block-label">Harga</span>
                            <span className = "input-prefix-price">Rp</span>

                            <input type = "number" name = "price" id = "price" className = "input-small price" onChange = {handleChange} value = {productData.price} onBlur = {handleValidation}></input>
                            {errorMessage.price && <p className = "add-product-errorValidation"><span>- </span>{errorMessage.price}</p>}

                        </label>
                        <label htmlFor = "desc">
                            <span className = "input-title block-label get-margin-top">Deskripsi</span>
                            <textarea name = "desc" id = "desc" ref ={refProductDataDescription}></textarea>
                        </label>
                        <label htmlFor = "urlImg">
                            <span className = "input-title block-label get-margin-top">URL Gambar</span>
                            <input type = "text" name = "urlImg" id = "urlImg" className = "input-large" ref = {refProductDataImg}></input>
                        </label>
                        <label htmlFor = "category">
                            <span className = "input-title block-label get-margin-top">Kategori</span>
                            <select name = "category" id = "category" className = "select-category" onChange = {handleChange}>
                                <option value="" className = "option-category" selected>Tidak ada kategori</option>

                                {
                                    loadingCategories? "":
                                    data.categories.map( (elm) => {
                                        return(
                                            <option key = {elm.id} value = {elm.id} className = "option-category">{elm.title}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className = "category-notfound" onClick = {() => setIsModalCategoriesOpen((prev) => !prev)}>Tidak menemukan kategori yang sesuai ?</div>
                        </label>
                        
                        <label>
                            <span className = "input-title block-label get-margin-top">Promo</span>
                            {productData.is_promo ? 
                                <div className = "promo-box-container">
                                    <div className = "btn-promo-close" onClick = {() => 
                                        setProductData({...productData,is_promo : false,promo : 0})}>Hapus Promo</div>
                                    <label htmlFor = "promo">
                                        <span className = "input-title get-margin-top block-label sub-label">Masukkan persentase diskon per produk (%)</span>
                                        <input type = "number" name = "promo" id = "promo" className = "input-small" onChange = {handleChange} onBlur = {handleValidation} value = {productData.promo}></input>
                                        <span className = "input-suffix-size">%</span>
                                        {errorMessage.promo && <p className = "add-product-errorValidation"><span>- </span>{errorMessage.promo}</p>}

                                    </label>
                                    <div className = "price-after-disc-container">
                                        <div className = "price-before-container">
                                            <h4 className = "price-disc-info">Harga Akhir</h4>
                                            <p className = "price-before-val">{
                                                productData.promo === "" || Number(productData.promo) < 0 ? `Rp ${Number(productData.price)}` :
                                               `Rp ${calculatingDiscount}`
                                            }</p>

                                        </div>
                                  

                                    </div>
                                </div>
                            :
                            <div type = "button" className = "btn-promo-box" onClick = {() => setProductData({...productData,is_promo : true})}>(+) Tambah Promo</div>
                        }

                        </label>
                        <div className = "btn-add-container">
                            <button className = "btn-addProduct btn-addProduct-back">Kembali</button>
                            <button className = "btn-addProduct btn-addProduct-submit">Submit</button>
                        </div>
                    </form>
                </div>
                {isModalCategoriesOpen ? <ModalCategories 
                addCategories = {addCategories}
                isLoading = {loadingInsertCategories}
                isModalCategoriesOpen = {setIsModalCategoriesOpen}
                isPopupOpen = {setIsPopupInsertCategoriesOpen}/> : ""}
            

                {isPopupInsertCategoriesOpen ? <PopupInsertCategory
                     statusLoading = {loadingInsertCategories}
                     statusError = {loadingErrorCategories}
                     statusData = {dataInsertCategories}
                     close = {setIsPopupInsertCategoriesOpen}
                />:""}
                {isPopupInsertProductOpen ? <PopupInsertProduct 
                
                    statusLoading = {loadingInsertProduct}
                    statusError = {loadingErrorProduct}
                    statusData = {dataInsertProduct}
                    close = {setIsPopupInsertProductOpen}
                /> 
                : ""

                }
                
               
            </div>
        </>
    )
}

export default AddProduct