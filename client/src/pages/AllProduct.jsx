
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCart from '../components/ProductCart'

const AllProduct = () => {

    // State Management
    const [filteredProducts,setFilterProducts] = useState([])
    const {products,searchQuery,setSearchQuery} = useAppContext()

    // Filtering Logic
    useEffect(()=>{
        if(searchQuery.length >0){
            setFilterProducts(products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }else {
            setFilterProducts(products)
        }
    },[products,searchQuery])

    // UI Rendering
    return (
        <div className='mt-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'>
               <p className='text-2xl font-medium uppercase'>All products</p>
               <div className='w-16 h-0.5 bg-primary rounded full'></div>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6'>
                {filteredProducts.filter(product=>product.inStock).map((product,index)=>(
                    <div key={index}>
                        <ProductCart product={product}/>
                    </div>
                ))}
            </div>
        </div>
      )
}

export default AllProduct

