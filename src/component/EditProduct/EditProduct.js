import React from 'react'
import './editproduct.css'
import { useParams } from "react-router-dom";
import { gql, useQuery} from "@apollo/client";
import { useState,useEffect } from 'react/cjs/react.development';
import FormEdit from '../FormEdit/FormEdit';

const GET_PRODUCT = gql`
query MyQuery($id: Int!) {
    products_by_pk(id: $id) {
      id
      name
      price
      size
      stok
      url_img
      is_promo
      discount
      description
      category_id
    }
  }
  

`;
const EditProduct = () => {
    
    let params = useParams();
    const [product,setProduct] = useState({})
    
    const {loading : loadingData, error :errorData,data : q} = useQuery(GET_PRODUCT,{
        variables :{
            id: params.productId
        }
    })
  

    return (
        <>
            
            <div className = "edit-product-overlay">
                {loadingData ? <p>Memuat data </p> : errorData ? <p>Error</p> :
                    <FormEdit
                        data = {q.products_by_pk}
                    />
                    
                }
            </div>
        </>
    )
}

export default EditProduct