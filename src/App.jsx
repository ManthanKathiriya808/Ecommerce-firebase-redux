// import { useState } from 'react'

import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Order from '../pages/order/Order'
import Cart from '../pages/cart/Cart'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import NoPage from '../pages/nopage/NoPage'
import Home from '../pages/home/Home'
import { MyState } from './context/data/MyState'
import Login from '../pages/registation/Login'
import Signup from '../pages/registation/Signup'
import ProductInfo from '../pages/productInfo/ProductInfo'
import AddProduct from '../pages/admin/page/AddProduct'
import UpdateProduct from '../pages/admin/page/UpdateProduct'
import { ToastContainer } from 'react-toastify'
import { Children } from 'react'

function App() {


  return (  
    <>
      <MyState>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/order" element={
              <ProtectedRoutes>
                <Order/>
              </ProtectedRoutes>
            } />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/dashboard" element={
              <ProtectedRoutesForAdmin>
                <Dashboard/>
              </ProtectedRoutesForAdmin>
            } />
            <Route path='/login' element={<Login/>} />
            <Route path='/addproduct' element={
              <ProtectedRoutesForAdmin>
                <AddProduct/>
              </ProtectedRoutesForAdmin>
            } />
            <Route path='/updateproduct' element={
              <ProtectedRoutesForAdmin>
                <UpdateProduct/>
              </ProtectedRoutesForAdmin>
              } />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/productinfo/:id' element={<ProductInfo/>} />
            <Route path="/*" element={<NoPage/>} /> 
          </Routes>
          <ToastContainer/>
        </BrowserRouter>   
      </MyState>
    </>
  )
}

export default App

// user
export const ProtectedRoutes = ({children})=>{

  const user = localStorage.getItem('user')
  if(user){
    return children
  }
  else{
    return <Navigate to={"/login"}/>
  }

}


// admin

export const ProtectedRoutesForAdmin = ({children})=>{

  const admin =JSON.parse(localStorage.getItem('user'))
  if(admin.user.email === 'manthankathiriya808@gmail.com'){
      return children
  }
  else{
    return <Navigate to={"/login"} />
  }

}