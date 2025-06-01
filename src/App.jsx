// import { useState } from 'react'

import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Order from '../pages/order/Order'
import Cart from '../pages/cart/Cart'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import NoPage from '../pages/nopage/NoPage'
import Home from '../pages/home/Home'
import { MyState } from './context/data/MyState'

function App() {


  return (  
    <>
      <MyState>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/order" element={<Order/>} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/*" element={<NoPage/>} />
          </Routes>
        </BrowserRouter>   
      </MyState>
    </>
  )
}

export default App
