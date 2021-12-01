import React from 'react'
import "./main.css"
import Sidebar from '../Sidebar/Sidebar'
import AddProduct from '../AddProduct/Addproduct';
import MyProduct from '../MyProduct/MyProduct';
import { Routes, Route} from "react-router-dom";
import EditProduct from '../EditProduct/EditProduct';
const Main = () => {

    return(
        <div className = "main-container">
            <div className = "main-flex">
                <Sidebar />
                <Routes>
                    <Route path = "/" element = {<MyProduct/>}></Route>
                    <Route path = "/addproduct" element = {<AddProduct/>}></Route>
                    <Route path = "/editproduct/:productId" element = {<EditProduct/>}></Route>
                    <Route path = "*" element = {<div className = "error-handle">
                        <p>Halaman tidak ditemukan</p>
                    </div>
                        
                        }></Route>
                    
                </Routes>

            </div>

        </div>
    )
}

export default Main