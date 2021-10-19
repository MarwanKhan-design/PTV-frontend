import React, { useState } from 'react'
import { createProduct } from '../api/product'

const CreateProduct = ({ setProducts, products }) => {
  const [product, setProduct] = useState({ name: '', unit: '' })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const create = async (e) => {
    e.preventDefault()

    await createProduct(product.name, product.unit).then((data) => {
      if (data.error) {
        console.log(data.error)
        setSuccess(false)
        setError(true)
      } else {
        setSuccess(true)
        setError(false)
        setProducts((prevState) => [product, ...prevState])
        setProduct({ name: '', unit: '' })
      }
    })
  }

  const showSuccess = (success) => {
    return (
      success && (
        <div className='alert alert-info' role='alert'>
          Product was created
        </div>
      )
    )
  }
  const showError = (error) => {
    return (
      error && (
        <div className='alert alert-danger' role='alert'>
          Product Already Exists
        </div>
      )
    )
  }
  return (
    <>
      <h2 className='mt-4'>Create Product</h2>
      {showSuccess(success)}
      {showError(error)}
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <form className='mt-4 form-floating'>
              <input
                type='text'
                className={`form-control ${error && 'is-invalid'}`}
                id='floatingInputValue'
                placeholder='Name'
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                required={true}
              />
              <label for='floatingInputValue'>Name</label>
            </form>
          </div>
          <div className='col-6'>
            <form className='mt-4 form-floating'>
              <input
                type='text'
                className={`form-control ${error && 'is-invalid'}`}
                id='floatingInputValue'
                placeholder='Unit'
                value={product.unit}
                onChange={(e) =>
                  setProduct({ ...product, unit: e.target.value })
                }
                required={true}
              />
              <label for='floatingInputValue'>Unit</label>
            </form>
          </div>
        </div>
      </div>
      <button
        type='submit'
        className='btn btn-primary mt-2'
        onClick={(e) => create(e)}
      >
        Create Product
      </button>
    </>
  )
}

export default CreateProduct
