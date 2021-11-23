import React from 'react'
import "./main.css"
import Sidebar from '../Sidebar/Sidebar'
import AddProduct from '../AddProduct/Addproduct';
import MyProduct from '../MyProduct/MyProduct';
import { Routes, Route} from "react-router-dom";
const Main = () => {

    return(
        <div className = "main-container">
            <div className = "main-flex">
                <Sidebar />
                <Routes>
                    <Route path = "/" element = {<MyProduct/>}></Route>
                </Routes>
                <Routes>
                    <Route path = "/addproduct" element = {<AddProduct/>}></Route>
                </Routes>

            </div>

        </div>
    )
}

export default Main