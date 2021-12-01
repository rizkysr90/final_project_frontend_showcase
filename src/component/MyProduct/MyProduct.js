import React,{useState} from "react";
import './myproduct.css'
import { gql, useMutation, useSubscription} from "@apollo/client";
import CardProduct from "../CartProduct/CartProduct";
import PopupDeleteProduct from "../Modal/PopupDeleteProducts/PopupDeleteProduct";
import ModalDelete from "../Modal/ModalDeleteProduct/ModalDelete";


const SUBS_PRODUCTS = gql`
subscription MySubscription($_name: String!) {
    products(where: {name:{_ilike: $_name}}) {
      id
      discount
      description
      category_id
      is_promo
      name
      price
      size
      stok
      url_img
    }
  }  
`;
const DELETE_PRODUCT =gql `
mutation MyMutation($id: Int!) {
    delete_products_by_pk(id: $id) {
      name
    }
  }
  
`;
const MyProduct = () => {
    const [subsState,setSubsState] = useState("");
    const [getProduct,setGetProduct] = useState({
        id : "",
        name : "",
        url_img :"",
        size : "",
        stok : "",
    })
    const [isPopupDeleteProductOpen,setIsPopupDeleteProductOpen] = useState(false);
    const [isModalDeleteProductOpen,setIsModalDeleteProductOpen] = useState(false);
    const {loading : loadingProduct,error : errorProduct,data : dataProduct} = useSubscription(SUBS_PRODUCTS,
        {
            variables:{_name:`%${subsState}%`},
       
        });
        
    const [setDeleteProduct,{loading : loadingDeleteProduct, error: errorDeleteProduct,data : dataDeleteProduct}] = useMutation(DELETE_PRODUCT)
    const deleteProduct = (id) => {
        setDeleteProduct({
            variables:{
                id
            }
        })
    }
    const [userInput,setUserInput] = useState("");

    const handleChange = (e) => {
        setUserInput(e.target.value)
    }
    return(
        <>
            <div className = "myProduct-container">
                <div className = "myProduct-centre">
                    <form className = "myProduct-search">
                        <div className = "myProduct-search-by-name">
                            <label className = "myProduct-search-by-name-input">
                                <input type = "text" name = "name" id = "name" className = "input-medium" placeholder = "Cari nama produk" value = {userInput} onChange = {(e) => handleChange(e)}></input>
                                <span className = "myProduct-search-by-name-input-suffix" onClick = {() => setSubsState(userInput)}>Cari</span>
                            </label>
                           
                        </div>

                    </form>
                    {
                        loadingProduct ? <p>Loading</p> : errorProduct ? <p>Error</p> : 
                        <div className = "admin-show-all-product-container">
                            <CardProduct
                                dataProduct = {dataProduct.products}
                                isModalDeleteOpen = {setIsModalDeleteProductOpen}
                                getDataForModal = {setGetProduct}
                            />
                         </div>
                    }
                
                </div>
               
            </div>
            {isModalDeleteProductOpen ? <ModalDelete 
                isModalDeleteOpen = {setIsModalDeleteProductOpen}
                isPopupDeleteProductOpen = {setIsPopupDeleteProductOpen}
                dataProduct = {getProduct}
                deleteProduct = {deleteProduct}
            />:""
                
            }
            {isPopupDeleteProductOpen ? <PopupDeleteProduct 
                statusLoading = {loadingDeleteProduct}
                statusError = {errorDeleteProduct}
                statusData = {dataDeleteProduct}
                close = {setIsPopupDeleteProductOpen}
            
            />:""

            }
    </>
    )

}

export default MyProduct