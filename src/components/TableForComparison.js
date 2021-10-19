import React, { useEffect, useState } from 'react'

const TableForComparison = ({ singleQuotation, bids }) => {
  const [lowestTotalPrice, setLowestTotalPrice] = useState(999999999999999)
  const [lowestTotalCompany, setLowestTotalCompany] = useState('')
  const [quotationCompanies, setQuotationCompanies] = useState([])

  const totalLowest = (totalPrice, company) => {
    if (parseInt(totalPrice) < parseInt(lowestTotalPrice)) {
      setLowestTotalPrice(totalPrice)
      setLowestTotalCompany(company.name)
      return
    } else {
      return
    }
  }
  const getQuotationCompanies = () => {
    bids.map((bid) =>
      setQuotationCompanies((prevState) => [...prevState, bid.company])
    )
  }

  useEffect(() => {
    singleQuotation.companies && getQuotationCompanies()
  }, [bids, singleQuotation.companies])

  return (
    <>
      <br />
      <br />
      <br />
      <table className='table table-bordered' style={{ fontSize: '10px' }}>
        <thead>
          <tr>
            <td></td>
            <td></td>
            {quotationCompanies.map((company) => (
              <>
                <th key={company._id}>{company.name}</th>
                <td key={company._id}></td>
              </>
            ))}
          </tr>
          <tr>
            <th>Products</th>
            <th>Quantity</th>
            {quotationCompanies.map((company) => (
              <>
                <th key={company._id}>RATE</th>
                <th>PER</th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {singleQuotation.products &&
            singleQuotation.products.map((product, i) => {
              console.log(product)
              return (
                <tr key={product._id}>
                  <td>{product.product.name}</td>
                  <td>{product.quantity}</td>
                  {bids.map((bid) => {
                    return (
                      <>
                        <td>{bid.prices[i].price * product.quantity}</td>
                        <td>{bid.prices[i].price}</td>
                      </>
                    )
                  })}
                </tr>
              )
            })}
          <tr>
            <th>Total</th>
            <td></td>
            {bids.map((bid) => {
              let total = 0
              console.log(bid)
              return (
                <>
                  <td>
                    {bid.prices.map((price, i) => {
                      total =
                        parseInt(total) +
                        parseInt(
                          price.price * bid.quotation.products[i].quantity
                        )
                      return <></>
                    })}
                    {totalLowest(total, bid.company)}
                    {total === lowestTotalPrice ? <b>{total}</b> : <>{total}</>}
                  </td>
                  <td></td>
                </>
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
    </>
  )
}

export default TableForComparison
