import React, { useContext, useState } from 'react'
import MyContext from '../../../src/context/data/myContext'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { FaCartPlus, FaUser } from 'react-icons/fa'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { AiFillShopping } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'

const DashboardTab = () => {
  const { mode, product, deleteProduct, editHandle, order, user } = useContext(MyContext)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const add = () => {
    navigate("/addproduct")
  }

  return (
    <div className="container mx-auto">
      <div className="tab container mx-auto">
        <Tabs defaultIndex={0}>
          <TabList className="md:flex md:space-x-8 grid grid-cols-2 text-center gap-4 md:justify-center mb-10">
            <Tab>
              <button className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center bg-[#605d5d12]">
                <div className="flex gap-2 items-center"><MdOutlineProductionQuantityLimits />Products</div>
              </button>
            </Tab>
            <Tab>
              <button className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500 hover:shadow-pink-700 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center">
                <div className="flex gap-2 items-center"><AiFillShopping /> Order</div>
              </button>
            </Tab>
            <Tab>
              <button className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center">
                <div className="flex gap-2 items-center"><FaUser /> Users</div>
              </button>
            </Tab>
          </TabList>

          {/* Products Tab */}
          <TabPanel>
            <div className="px-4 md:px-0 mb-16">
              <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : '' }}>Product Details</h1>
              <div className="flex justify-end mb-4">
                <button
                  onClick={add}
                  className="focus:outline-none text-white bg-pink-600 border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5"
                  style={{
                    backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                    color: mode === 'dark' ? 'white' : '',
                  }}
                >
                  <div className="flex gap-2 items-center">
                    Add Product <FaCartPlus size={20} />
                  </div>
                </button>
              </div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                    <tr>
                      <th className="px-6 py-3">S.No</th>
                      <th className="px-6 py-3">Image</th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  {product.map((item, index) => {
                    const { title, price, imageUrl, category, date } = item
                    return (
                      <tbody key={index}>
                        <tr className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                          <td className="px-6 py-4">{index + 1}.</td>
                          <td className="px-6 py-4"><img className="w-16" src={imageUrl} alt="img" /></td>
                          <td className="px-6 py-4">{title}</td>
                          <td className="px-6 py-4">₹{price}</td>
                          <td className="px-6 py-4">{category}</td>
                          <td className="px-6 py-4">{date}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 text-black" style={{ color: mode === 'dark' ? 'white' : '' }}>
                              <div onClick={() => deleteProduct(item)} className="cursor-pointer">
                                🗑️
                              </div>
                              <Link to={"/updateproduct"}>
                                <div onClick={() => editHandle(item)} className="cursor-pointer">
                                  ✏️
                                </div>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    )
                  })}
                </table>
              </div>
            </div>
          </TabPanel>

          {/* Orders Tab */}
          <TabPanel>
            <div className="relative overflow-x-auto mb-16">
              <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : '' }}>Order Details</h1>
              {order.map((allOrder, index) => (
                <table key={index} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-black uppercase bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                    <tr>
                      <th className="px-6 py-3">Payment Id</th>
                      <th className="px-6 py-3">Image</th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Address</th>
                      <th className="px-6 py-3">Pincode</th>
                      <th className="px-6 py-3">Phone</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Date</th>
                    </tr>
                  </thead>
                  {allOrder.cartItems.map((item, i) => {
                    const { title, category, imageUrl, price } = item
                    return (
                      <tbody key={i}>
                        <tr className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                          <td className="px-6 py-4">{allOrder.paymentId}</td>
                          <td className="px-6 py-4"><img className="w-16" src={imageUrl} alt="img" /></td>
                          <td className="px-6 py-4">{title}</td>
                          <td className="px-6 py-4">₹{price}</td>
                          <td className="px-6 py-4">{category}</td>
                          <td className="px-6 py-4">{allOrder.addressInfo?.name}</td>
                          <td className="px-6 py-4">{allOrder.addressInfo?.address}</td>
                          <td className="px-6 py-4">{allOrder.addressInfo?.pincode}</td>
                          <td className="px-6 py-4">{allOrder.addressInfo?.phoneNumber}</td>
                          <td className="px-6 py-4">{allOrder.email}</td>
                          <td className="px-6 py-4">{allOrder.date}</td>
                        </tr>
                      </tbody>
                    )
                  })}
                </table>
              ))}
            </div>
          </TabPanel>

          {/* Users Tab */}
          <TabPanel>
            <div className="relative overflow-x-auto mb-10">
              <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : '' }}>User Details</h1>
              {user.map((userObj, index) => {
                const userDetails = userObj?.user || {};
                return (
                  <table key={index} className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                      <tr>
                        <th className="px-6 py-3">S.No</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">UID</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                        <td className="px-6 py-4">{index + 1}.</td>
                        <td className="px-6 py-4">{userDetails?.name || 'No name'}</td>
                        <td className="px-6 py-4">{userDetails?.email || 'No email'}</td>
                        <td className="px-6 py-4">{userDetails?.uid || 'No UID'}</td>
                      </tr>
                    </tbody>
                  </table>
                )
              })}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default DashboardTab
