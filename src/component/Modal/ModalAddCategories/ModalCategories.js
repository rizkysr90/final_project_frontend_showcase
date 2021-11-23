import React, { useState } from 'react'
import './modalcategories.css'

const ModalCategories = (props) => {
    const [data,setData] = useState({
        name_categories : "",
        img_categories : "",
    })

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(data.name_categories && data.img_categories){
            const newData =  {
                name_categories : data.name_categories,
                img_categories : data.img_categories,
            }
           
            props.addCategories(newData)

            setData({
                ...data,
                name_categories : "",
                img_categories : ""
            })
            props.isModalCategoriesOpen((prev) => !prev)
            props.isPopupOpen((prev) => !prev)
        } else {
            alert("Harap isi data yang kosong")
        }
    }


    return(
        <div className = "modalcategories-container">
            <div className = "modalcategories-centre">
                <h4>Tambah Kategori</h4>
                <form className = "modalcategories-form" onSubmit = {handleSubmit}> 
                    <label htmlFor = "name_categories">
                            <span className = "input-title-categories block-label">Nama</span>
                            <input type = "text" name = "name_categories" value = {data.name_categories} id = "name_categories" className = "input-categories" onChange = {handleChange}></input>
                    </label>
                    <label htmlFor = "img_categories">
                            <span className = "input-title-categories block-label">URL Gambar</span>
                            <input type = "text" name = "img_categories"  value = {data.img_categories} id = "img_categories" className = "input-categories" onChange = {handleChange} ></input>
                    </label>

                    <div className = "btn-categories-container">
                            <button className = "btn-categories btn-categories-back"
                                    onClick = {() => props.isModalCategoriesOpen((prev) => !prev)}
                            
                            >Kembali</button>
                            <button className = "btn-categories btn-categories-submit" 
                            >Tambah</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ModalCategories