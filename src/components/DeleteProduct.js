import React from 'react'

const DeleteProduct = ({ product }) => {
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type='button'
        className='btn btn-danger'
        data-bs-toggle='modal'
        data-bs-target='#exampleModal'
      >
        Remove
      </button>

      {/* <!-- Modal --> */}
      <div
        className='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Conformation
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              Are you sure you want to delete this product
              <br />
              Name: {product.name}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-danger'
                // onClick={removeProduct}
              >
                Delete this product
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteProduct
