
import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const AddAddress = () => {

  const {axios,user,navigate} = useAppContext()

  // Address State
  const [address, setAddress] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:'',
  })

  // Input Change Handler
  const ChangeHandler = (e) => {
    const { name, value } = e.target
    setAddress((data) => ({ ...data, [name]: value }));
  }

  // Form Submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/address/add', {address});

      if(data.success){
        toast.success(data.message)
        navigate('/cart')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(!user){
      navigate('/cart')
    }
  },[])

  // UI Rendering
  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-primary'>Address</span>
      </p>

      <div className='flex flex-col-reverse md:flex-row justify-between items-center mt-10 md:gap-5'>
        
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

            <div className='grid grid-cols-2 gap-4'>
              <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition' 
                type="text" onChange={ChangeHandler} value={address.firstName} name='firstName' placeholder='First Name' required/>

              <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition' 
                type="text" onChange={ChangeHandler} value={address.lastName} name='lastName' placeholder='Last Name' required/>
            </div>

            <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
              type="email" onChange={ChangeHandler} value={address.email} name='email' placeholder='Email address' required/>

            <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
              type="text" onChange={ChangeHandler} value={address.street} name='street' placeholder='Street' required/>

            <div className='grid grid-cols-2 gap-4'>
              <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="text" onChange={ChangeHandler} value={address.city} name='city' placeholder='City' required/>

              <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="text" onChange={ChangeHandler} value={address.state} name='state' placeholder='State' required/>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="number" onChange={ChangeHandler} value={address.zipcode} name='zipcode' placeholder='Zipcode' required/>

              <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
                type="text" onChange={ChangeHandler} value={address.country} name='country' placeholder='Country' required/>
            </div>

            <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
              type="text" onChange={ChangeHandler} value={address.phone} name='phone' placeholder='Phone' required/>

            <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition rounded cursor-pointer uppercase'>
              Save address
            </button>

          </form>
        </div>

        <img className='w-full md:max-w-xs lg:max-w-sm mb-16 md:mt-0' src={assets.add_address_iamge} alt="" />
      </div>
    </div>
  )
}

export default AddAddress

