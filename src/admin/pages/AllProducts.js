import React from 'react'
import ProductsList from '../components/ProductsList'

const AllProducts = () => {
  return (
    <div className='w-full h-full bg-gray-100 rounded-[1rem] p-[1rem] overflow-y-auto'>
      <ProductsList />
    </div>
  )
}

export default AllProducts
