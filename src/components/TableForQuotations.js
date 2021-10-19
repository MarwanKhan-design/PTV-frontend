import React, { useState, Fragment } from 'react'

const TableForQuotations = ({ singleQuotation, bids }) => {
  const [lowestTotalPrice, setLowestTotalPrice] = useState(10000000000)
  const [lowestTotalCompany, setLowestTotalCompany] = useState('Not Defined')

  const totalLowest = (value, company) => {
    if (parseInt(value) < parseInt(lowestTotalPrice)) {
      setLowestTotalPrice(value)
      setLowestTotalCompany(company.name)
      return
    } else {
      return
    }
  }
  return (
    <Fragment style={{ fontSize: 8 }}>
      <table className='table mt-3 table-bordered' style={{ fontSize: 10 }}>
        <thead>
          <tr>
            <th>Products </th>
            <th>QTY</th>
            {/* <td>Qty</td> */}
            {bids.map((bid) => (
              <>
                {bid.quotation._id === singleQuotation._id && (
                  <>
                    <th scope='col' key={bid._id}>
                      {bid.company.name} <br />
                      <table className='table table-bordered m-0 p-0'>
                        <tr>
                          <td>Rate</td>
                          <td>PER</td>
                        </tr>
                      </table>
                    </th>
                  </>
                )}
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* {bids.map((bid, i) => ( */}
            {/* <Fragment key={bid._id}> */}
            {/* <tr>{bid.prices[i].product.name}</tr> */}
            <td style={{ width: '25%' }}>
              {singleQuotation.products &&
                singleQuotation.products.map((product) => (
                  <table className='table table-bordered'>
                    <tr>
                      <td> {product.product.name}</td>
                    </tr>
                  </table>
                ))}
              <tr style={{ fontSize: 12 }}>
                <th>Total</th>
              </tr>
            </td>
            <td>
              {singleQuotation.products &&
                singleQuotation.products.map((product) => (
                  <table className='table table-bordered'>
                    <tr>
                      <td className='text-center'>{product.quantity}</td>
                    </tr>
                  </table>
                ))}
            </td>
            {/* </Fragment> */}
            {/* ))} */}
            {bids.map((bid, i) => {
              let total = 0
              return (
                bid.quotation._id === singleQuotation._id && (
                  <td key={bid._id}>
                    {bid.prices.map((price, i) => {
                      const quantity = bid.quotation.products[i].quantity

                      total = parseInt(total) + parseInt(price.price * quantity)
                      return (
                        <table className='table table-bordered'>
                          <tr key={price._id}>
                            <td width='50%'>{price.price * quantity}</td>
                            <td width='50%'>{price.price}</td>
                          </tr>
                        </table>
                      )
                    })}
                    <tr style={{ fontSize: 12 }}>
                      {/* {
                        bid.prices.map((price) => {
                            total = parseInt(total) + parseInt(price.price)
                          })
                      } */}
                      {totalLowest(total, bid.company)}
                      {total === parseInt(lowestTotalPrice) ? (
                        <th>Lowest {total}</th>
                      ) : (
                        <td>{total}</td>
                      )}
                    </tr>
                  </td>
                )
              )
            })}
          </tr>
        </tbody>
      </table>
      <p className='text-center'>
        Quotation of M/s{' '}
        <span className='text-uppercase'>{lowestTotalCompany}</span> may kindly
        be approved
      </p>
    </Fragment>
  )
}

export default TableForQuotations
