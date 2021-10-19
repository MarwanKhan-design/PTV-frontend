import React from 'react'
import { Link } from 'react-router-dom'
import { deleteQuotation, singleQuotation } from '../api/quotation'
import Pagination from './Pagination'

const ShowQuotations = ({
  quotations,
  setQuotations,
  page,
  setPage,
  totalPages,
}) => {
  const removeQuotation = (quotation, i) => {
    console.log(quotation)
    deleteQuotation(quotation).then((data) => {
      if (data.error) {
        console.log(data)
      } else {
        const array = [...quotations]
        array.indexOf(i)
        if (i !== -1) {
          array.splice(i, 1)
          setQuotations(array)
        }
        // products.splice(i, 1)
        console.log(i)
      }
    })
  }

  return (
    <div>
      <div>
        <center>
          <h4>Pakistan Television Corporation Limited</h4>
          <h4>Peshawar Center</h4>
        </center>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Products</th>
              {/* <th scope='col'>Qty</th> */}
              <th scope='col'>Companies</th>
              <th scope='col'>Methods</th>
            </tr>
          </thead>
          <tbody>
            {quotations &&
              quotations.map((quotation, i) => {
                return (
                  <>
                    <tr key={i}>
                      <th scope='row'>{i + 1}</th>
                      <td style={{ fontSize: 10 }}>
                        <Link to={`/quotation/${quotation._id}`}>
                          {quotation.name}
                        </Link>
                        <br />
                      </td>
                      <td style={{ fontSize: 10 }}>
                        {quotation.products &&
                          quotation.products.map((product, i) => (
                            <>
                              {i !== 0 && ' || '} {product.product.name}
                            </>
                          ))}
                      </td>
                      {/* <td>
                    {quotation.products.map((product) => (
                      <>
                        {product.quantity} <br />
                      </>
                    ))}
                  </td> */}
                      <td style={{ fontSize: 10 }}>
                        {quotation.companies &&
                          quotation.companies.map((company, i) => (
                            <>
                              {i !== 0 && ' || '}
                              <Link
                                to={`/purchaseEnquiry/${quotation._id}/${company._id}`}
                              >
                                {company.name}{' '}
                              </Link>
                            </>
                          ))}
                      </td>

                      <td>
                        <button
                          className='btn btn-danger'
                          onClick={() => removeQuotation(quotation._id, i)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    <tr>
                      {/* <table> */}
                      {/* <tr> */}
                      <td></td>
                      <td>
                        <Link
                          to={`/purchaseEnquiry/${quotation._id}`}
                          className='btn btn-success btn-sm'
                        >
                          Enquiry
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/bids/?quotationId=${quotation._id}`}
                          className='btn btn-primary btn-sm'
                        >
                          Create Bid
                        </Link>
                        {/* <br /> */}
                      </td>

                      <td>
                        <Link
                          to={`/quotation/${quotation._id}`}
                          className='btn btn-success btn-sm'
                        >
                          Comparative
                        </Link>
                      </td>
                      <td></td>
                      {/* </tr> */}
                      {/* </table> */}
                    </tr>
                  </>
                )
              })}
          </tbody>
        </table>
      </div>
      <Pagination setPage={setPage} totalPages={totalPages} page={page} />
    </div>
  )
}

export default ShowQuotations
