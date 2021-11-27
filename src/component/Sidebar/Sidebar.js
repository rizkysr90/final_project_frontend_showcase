import React from 'react'
import './sidebar.css'
import { NavLink } from "react-router-dom";
const Sidebar = () => {
    return (
        <>
            <nav className = "sidebar-container">
                <div className = "sidebar-centre">
                    <h2>Produk</h2>
                    <ul className = "product-list">
                        <li><NavLink to = "/">Produk saya</NavLink></li>
                        <li><NavLink to = "/addproduct">Tambah produk</NavLink></li>

                    </ul>

                </div>
            </nav>
        </>
    )
}

export default Sidebar