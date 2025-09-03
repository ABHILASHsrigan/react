import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../Components/Home'
import Product from '../Components/Product'
import AddProduct from '../Components/AddProduct'
import EditPage from '../Components/EditPage'
import Login from '../Components/Login'
import PrivateComponent from "../Components/PrivateComponent.jsx"
import Description from '../Components/Description.jsx'

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={
          <PrivateComponent>
            <Product />
          </PrivateComponent>
        } />
        <Route path='/addproduct/:id' element={<AddProduct />} />
        <Route path='/edit' element={<EditPage />} />
        <Route path='/login' element={<Login />} />
        <Route path="/description/:id" element={<Description />} />
      </Routes>
    </div>
  )
}

export default AllRoutes
