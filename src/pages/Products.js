import React, { useEffect } from 'react'
import { useState } from 'react'
import { getPaginatedProducts, getProducts } from '../api/product'
import CreateProduct from '../components/CreateProduct'
import Navbar from '../components/Navbar'
import ShowProducts from '../components/ShowProducts'

const Products = () => {
  let [products, setProducts] = useState([])

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(7)
  const [totalPages, setTotalPages] = useState()

  const listProducts = async () => {
    await getPaginatedProducts(page, limit)
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setProducts(data.results)
          setTotalPages(data.totalPages)
          console.log(data)
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    listProducts()
    document.title = 'Products'
  }, [page, limit])

  return (
    <div>
      <div className='container'>
        <div className='row gx-5'>
          <div className='col-md-6'>
            <ShowProducts
              products={products}
              setProducts={setProducts}
              setPage={setPage}
              setLimit={setLimit}
              totalPages={totalPages}
              page={page}
            />
          </div>
          <div className='col-md-6'>
            <CreateProduct setProducts={setProducts} products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
