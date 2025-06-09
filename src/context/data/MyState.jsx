import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

export function MyState({children}){

    const [mode,setMode] = useState("light")

    const toggleMode = ()=>{

        if(mode === "light"){
            setMode("dark")
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }

        else{
            setMode("light")
            document.body.style.backgroundColor = "white"
        }
    }


 const [loading, setLoading] = useState(false)


 const [products,setProducts] = useState({
    title:null,
    price:null,
    imageUrl:null,
    category:null,
    description:null,
    time:Timestamp.now(),
    date: new Date().toLocaleString(
        "en-US",
        {
           month:"short",
           day:"2-digit",
           year:"numeric" 
        }
    )
 })


//     add product section

    const  addProduct = async ()=>{
            if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    setLoading(true)

    try {
        // const productRef = await addDoc(collection(fireDB,"products",{products}))
        const productRef = await addDoc(collection(fireDB,"products"),products)
         toast.success("Product Add successfully")
        
         setTimeout(() => {
         window.location.href="/dashboard"
            
         }, 800);
         getProductData()
         setLoading(false)
        
    } catch (error) {
         toast.error("Product Not Added")

        console.log(error.message)
         setLoading(false)

    }
    }                   


    const [product,setProduct] = useState([])

    const getProductData = async ()=>{
        setLoading(true)

        try {
              const q = query(
        collection(fireDB, "products"),
        orderBy("time")
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(),id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }




    const editHandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async()=>{
        setLoading(true)

        try {
            await setDoc(doc(fireDB,"products",products.id),products)
             toast.success("Product Updated successfully")
      getProductData();
            setLoading(false)
setTimeout(() => {
            window.location.href = "/dashboard  "
    
}, 800);            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }

    const deleteProduct =async (item)=>{

        try {
             setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()

        } catch (error) {
            toast.delete("product deleted successfully")
                        console.log(error)
            setLoading(false)
        }
    }


    const [order,setOrder] = useState([])

    const getOrderData = async ()=>{
        setLoading(true)

        try {
            const result = await getDocs(collection(fireDB,"orders"))
            const orderArray = []
            result.forEach((ele)=>{
                orderArray.push(ele.data())
                setLoading(false)

            })
            setOrder(orderArray)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    const [user,setUser]= useState([])

    const getUserData =async ()=>{

        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB,"users"))
            const userArray = []
            result.forEach((ele)=>{
                userArray.push(ele.data())
            })
            // console.log(userArray)
            setUser(userArray)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }
    useEffect(()=>{
        getProductData()
        getOrderData()
        getUserData()
    },[])


    const [ searchkey,setSearchkey] = useState("")
    const [filterType,setFilterType] = useState("")
    const [filterPrice,setFilterPrice] = useState("")
    return(
        <MyContext.Provider value={{mode,toggleMode,loading,setLoading,products,setProducts,addProduct, product,setProduct,deleteProduct,updateProduct,editHandle,order,user,searchkey,setSearchkey,filterType,setFilterType,filterPrice,setFilterPrice}}>
            {children}
        </MyContext.Provider>
    )

}