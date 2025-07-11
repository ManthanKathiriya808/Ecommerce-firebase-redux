import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import MyContext from '../../src/context/data/myContext'
import { toast } from 'react-toastify'
// import { createUserWithEmailAndPassword } from 'firebase/auth/cordova'
import {  createUserWithEmailAndPassword } from "firebase/auth";
// import { createUserWithEmailAndPassword } from 'firebase/auth/web-extension'
import { collection, addDoc, Timestamp } from "firebase/firestore"; 
import { fireDB,auth } from '../../src/firebase/FirebaseConfig';
import Loader from '../../src/components/loader/Loader';
const Signup = () => {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const {loading,setLoading} = useContext(MyContext)


    const signUp =async ()=>{
        if(name === "" || email === "" || password === ""){
            return toast.error("All Fields are required!")
        }
            setLoading(true)


        try {
            
            const users = await createUserWithEmailAndPassword(auth,email,password)
            
            const user={
                name:name,
                uid: users.user.uid,
                email:users.user.email,
                time:Timestamp.now()
            }
            // console.log(user)

            const userRef = await addDoc(collection(fireDB,"users"),{user})

            // console.log(userRef)
            setEmail("")
            setName("")
            setPassword("")
            toast.success("Sign Successfull")
            setLoading(false)

        } catch (error) {
            console.log(error)
              toast.error("Sign Failed")
            setLoading(false)

        }
    }

  return (
    <div>

         <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        name='name'
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>
                <div>
                    <input type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                    
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={signUp}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={"/login"}>Login</Link></h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup
