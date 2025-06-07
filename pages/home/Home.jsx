import React, { useContext } from 'react'
import Layout from '../../src/components/layout/Layout'
import MyContext from '../../src/context/data/MyContext'
import HeroSection from '../../src/components/heroSection/HeroSection'
import Filter from '../../src/components/filter/Filter'
import ProductCArd from '../../src/components/productCard/ProductCArd'
import Track from '../../src/components/track/Track'
import Testimonial from '../../src/components/testimonial/Testimonial'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../src/redux/cartSlice'


const Home = () => {


   const dispatch = useDispatch()
   const cardItem = useSelector((state) => state.cart)

console.log(cardItem)


  return (
    <Layout>
     
    <HeroSection/>
    <Filter/>
    <ProductCArd/>
    <Track/>
    <Testimonial/>
    </Layout>
    
  )
}

export default Home
