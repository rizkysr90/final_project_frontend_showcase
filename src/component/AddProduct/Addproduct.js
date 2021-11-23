import React, { useState } from "react";
import "./addproduct.css"
import ModalCategories from "../Modal/ModalAddCategories/ModalCategories";
import PopupInsertCategory from "../Modal/PopupInsertCategory/PopupInsertCategory";
import { useQuery,gql, useSubscription, useMutation } from "@apollo/client";
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
    const {loading : loadingCategories,error : errorCategories,data} = useSubscription(SUBS_CATEGORIES);
    const [insertCategories,{loading : loadingInsertCategories, error : loadingErrorCategories, data : dataInsertCategories}] = useMutation(INSERT_CATEGORIES)
    const [isModalCategoriesOpen,setIsModalCategoriesOpen] = useState(false);
    const [isPopupInsertCategoriesOpen,setIsPopupInsertCategoriesOpen] = useState(false);

    const addCategories = (admindata) => {
        insertCategories({
            variables : {
                title : admindata.name_categories,
                url_img : admindata.img_categories,
            }
        })
    }

    const handlePopupInsertCategoriesOpen = () => {
        console.log("hallo")
        setIsPopupInsertCategoriesOpen((prev) => {
            if (prev) {
                return !prev
            } else {
                return !prev
            }
        })
    }
    return(
        <>
            <div className = "addProduct-container">
                <div className = "addProduct-centre">
                    <form>
                        <label htmlFor = "name">
                            <span className = "input-title block-label">Nama Product</span>
                            <input type = "text" name = "name" id = "name" className = "input-large" ></input>
                        </label>
                        <label htmlFor = "size">
                            <span className = "input-title get-margin-top block-label">Berat</span>
                            <input type = "number" name = "size" id = "size" className = "input-small"></input>
                            <span className = "input-suffix-size">gr</span>
                        </label>
                        <label htmlFor = "stok">
                            <span className = "input-title get-margin-top block-label">Stok</span>
                            <input type = "number" name = "stok" id = "stok" className = "input-small"></input>
                        </label>
                        <label htmlFor = "price">
                            <span className = "input-title get-margin-top block-label">Harga</span>
                            <span className = "input-prefix-price">Rp</span>

                            <input type = "number" name = "price" id = "price" className = "input-small price"></input>
                        </label>
                        <label htmlFor = "desc">
                            <span className = "input-title block-label get-margin-top">Description</span>
                            <textarea name = "desc" id = "desc"></textarea>
                        </label>
                        <label htmlFor = "urlImg">
                            <span className = "input-title block-label get-margin-top">URL Gambar</span>
                            <input type = "text" name = "urlImg" id = "urlImg" className = "input-large" ></input>
                        </label>
                        <label htmlFor = "category">
                            <span className = "input-title block-label get-margin-top">Kategori</span>
                            <select name = "category" id = "category" class = "select-category">
                                <option value="" class = "option-category">Tidak ada kategori</option>

                                {
                                    loadingCategories? "":
                                    data.categories.map( (elm) => {
                                        return(
                                            <option key = {elm.id} value = {elm.id} class = "option-category">{elm.title}</option>
                                        )
                                    })
                                }
                            </select>
                            <div className = "category-notfound" onClick = {() => setIsModalCategoriesOpen((prev) => !prev)}>Tidak menemukan kategori yang sesuai ?</div>
                        </label>
                        
                        <label>
                            <span className = "input-title block-label get-margin-top">Promo</span>
                            <a href = "#" className = "promo-box">(+) Tambah Promo</a>
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
                {/* {loadingInsertCategories ? <PopupInsertCategory
                     statusLoading = {loadingInsertCategories}
                     statusError = {loadingErrorCategories}
                     statusData = {dataInsertCategories}
                     closeModal = {setIsPopupInsertCategoriesOpen}
                /> : <p>Finish</p>} */}
                {/* {isPopupInsertCategoriesOpen ? <PopupInsertCategories
                     loading = {loadingInsertCategories}
                     error = {loadingErrorCategories}
                     data = {dataInsertCategories}
                     close = {setIsPopupInsertCategoriesOpen}
                /> : ""} */}
                {/* {loadingInsertCategories ? <p>Loading geng</p> : ""} */}
                {/* {loadingInsertCategories ?  () => setIsPopupInsertCategoriesOpen((prev) => !prev): ""} */}
                        {/* {/* {loadingInsertCategories ? handlePopupInsertCategoriesOpen : ""} */}
                {/* {
                    loadingInsertCategories ? 
                    <PopupInsertCategories 
                    loading = {loadingInsertCategories}
                    error = {loadingErrorCategories}
                    data = {dataInsertCategories}
                    /> : 
                    <PopupInsertCategories 
                    loading = {loadingInsertCategories}
                    error = {loadingErrorCategories}
                    data = {dataInsertCategories}
                    />
                } */}
               
            </div>
        </>
    )
}

export default AddProduct