import React from 'react'
import { deleteProduct } from '../api/product'
import Pagination from './Pagination'

const ShowProducts = ({
  products,
  setProducts,
  setPage,
  setLimit,
  totalPages,
  page,
}) => {
  const removeProduct = (product, i) => {
    console.log(product)
    deleteProduct(product).then((data) => {
      if (data.error) {
        console.log(data)
        // setSuccess(false)
        // setError(true)
      } else {
        // setSuccess(true)
        // setError(false)
        const array = [...products]
        array.indexOf(i)
        if (i !== -1) {
          array.splice(i, 1)
          setProducts(array)
        }
        // products.splice(i, 1)
        console.log(i)
      }
    })
  }

  return (
    <div>
      <h2 className='mt-4'>All Products</h2>
      <table className='table mt-3 table-bordered'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Unit</th>
            <th scope='col'>Methods</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => {
            return (
              <tr key={i + 1}>
                <th scope='row'>{i + 1}</th>
                <td>{product.name}</td>
                <td>{product.unit}</td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => removeProduct(product._id, i)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination
        setPage={setPage}
        setLimit={setLimit}
        totalPages={totalPages}
        page={page}
      />
    </div>
  )
}

export default ShowProducts
