
// Imports
import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import cart_icon from '../assets/nav_cart_icon.svg'
import serach_icon from '../assets/search_icon.svg'
import menu_icon from '../assets/menu_icon.svg'
import { useAppContext } from '../context/AppContext'
import profile_icon from '../assets/profile_icon.png'
import toast from 'react-hot-toast'

// Navbar Component
const Navbar = () => {

    // Local State
    const [open, setOpen] = useState(null)
    
    // App Context State
    const {user,setUser,navigate,setShowUserLogin,searchQuery,setSearchQuery,getCartCount,axios} = useAppContext()

    // Logout Function
    const logout=async()=>{
      try {
        const { data } = await axios.get('/api/user/logout')
        if(data.success){
          toast.success(data.message)
          setUser(null)
          navigate('/')
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    // Navigate on Search
    useEffect(()=>{
      if(searchQuery > 0){
        navigate('/products')
      }
    },[searchQuery])
    
  // Navbar UI
  return (
    <div className='flex justify-between items-center px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 relative transition-all' >
        
        {/* Logo */}
        <NavLink to='/' onClick={()=>setOpen(false)}>
            <img src={logo} alt="" />
        </NavLink>

        {/* Desktop Menu */}
        <div className='hidden sm:flex items-center gap-8'>
            <NavLink to='/seller' className='text-gray-500 text-xs border border-gray-300 rounded-full py-1 px-2.5 '>Seller Dashboard</NavLink>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/products'>All Products</NavLink>

            {/* Search Bar */}
            <div className='hidden lg:flex items-center text-sm gap-2 border rounded-full px-2 py-1 border-gray-300 '>
                <input 
                  onChange={(e)=>setSearchQuery(e.target.value)} 
                  className='outline-none py-1.5 w-full bg-transparent placeholder-gray-500' 
                  type="text" 
                  placeholder='Search Products'
                />
                <img src={serach_icon} alt="" />
            </div>
            
            {/* Cart Icon */}
            <div onClick={()=>navigate('/cart')} className='relative group cursor-pointer'>
                <img src={cart_icon} alt="" />
                <button className='absolute -right-3 -top-2 bg-primary rounded-full w-[18px] h-[18px] text-white text-sm '>
                    {getCartCount()}
                </button>
            </div>

            {/* Login / Profile Menu */}
            {!user ?
            <button 
              onClick={()=>setShowUserLogin(true)} 
              className='bg-primary px-8 py-2 text-white transition hover:bg-primary-dull rounded-full cursor-pointer'>
                Login
            </button>
            : 
            <div className='relative group'>
               <img className='w-10 cursor-pointer' src={profile_icon} alt="" />
               <ul className='hidden group-hover:block absolute top-9 right-0 bg-white shadow-md w-30 py-1.5 mt-1 rounded-md text-sm translate-z-40 z-1'>
                <li 
                  className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer' 
                  onClick={()=>navigate('/my-orders')}>
                  My Orders
                </li>
                <li 
                  onClick={logout} 
                  className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>
                  Logout
                </li>
               </ul>
            </div>}
        </div>

        {/* Mobile Icons */}
        <div className='flex items-center gap-6 sm:hidden'>

            {/* Mobile Cart */}
            <div onClick={()=>navigate('/cart')} className='relative group cursor-pointer'>
                <img src={cart_icon} alt="" />
                <button className='absolute -right-3 -top-2 bg-primary rounded-full w-[18px] h-[18px] text-white text-sm '>
                    {getCartCount()}
                </button>
            </div>

            {/* Mobile Menu Button */}
            <div onClick={()=> open ? setOpen(false) : setOpen(true)} className='cursor-pointer'>
                <img src={menu_icon} alt="" />
            </div>

        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`${open ? "flex" : "hidden"} absolute top-[60px] left-0 px-5 py-6 flex-col gap-2 text-sm shadow-md w-full items-start sm:hidden z-20 bg-white`}>
            <NavLink to='/' onClick={()=>setOpen(false)}>Home</NavLink>
            <NavLink to='/products' onClick={()=>setOpen(false)}>All Products</NavLink>
            {user && <NavLink to='/my-orders' onClick={()=>setOpen(false)}>My Orders</NavLink>}
            <NavLink to='/' onClick={()=>setOpen(false)}>Contact</NavLink>

            {/* Mobile Login / Logout */}
            {!user ? (
                <button 
                  onClick={()=>{
                    setOpen(false)
                    setShowUserLogin(true)
                  }} 
                  className='px-6 py-2 mt-2 text-sm cursor-pointer bg-primary hover:bg-primary-dull text-white rounded-full'>
                  Login
                </button>
            ): (
                <button className='px-6 py-2 mt-2 text-sm cursor-pointer bg-primary hover:bg-primary-dull text-white rounded-full'>
                    Logout
                </button>
            )}
        </div>
        
    </div>
  )
}

export default Navbar

