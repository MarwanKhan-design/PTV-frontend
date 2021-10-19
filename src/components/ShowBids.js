import React from 'react'
import { deleteBid } from '../api/bids'

const ShowBids = ({ bids, setBids }) => {
  const removeBid = (bid, i) => {
    console.log(bid)
    deleteBid(bid).then((data) => {
      if (data.error) {
        console.log(data)
        // setSuccess(false)
        // setError(true)
      } else {
        // setSuccess(true)
        // setError(false)
        const array = [...bids]
        array.indexOf(i)
        if (i !== -1) {
          array.splice(i, 1)
          setBids(array)
        }
        // products.splice(i, 1)
        console.log(i)
      }
    })
  }
  return (
    <div>
      <h2 className='mt-4'>All Bids</h2>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Quotation</th>
            <th scope='col'>Company</th>
            <th scope='col'>Prices</th>
            <th scope='col'>Methods</th>
          </tr>
        </thead>
        <tbody>
          {bids.map((bid, i) => {
            return (
              <tr key={i + 1}>
                <th scope='row'>{i + 1}</th>
                {/* <td>{bid.name}</td> */}
                <td>{bid.quotation.name}</td>
                <td>{bid.company.name}</td>
                <td>
                  {bid.prices.map((price) => (
                    <>
                      {price.product !== null && price.product.name}:
                      {price.price}
                      <br />
                    </>
                  ))}
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => removeBid(bid._id, i)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ShowBids
