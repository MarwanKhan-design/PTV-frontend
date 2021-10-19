import React from 'react'

const TableForEnquiry = ({ quotation }) => {
  return (
    <>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>S.no</th>
            <th scope='col'>Description</th>
            <th scope='col'>Qty</th>
            <th scope='col'>Unit</th>
          </tr>
        </thead>
        <tbody>
          {quotation.products &&
            quotation.products.map((product, i) => (
              <tr key={i}>
                <th scope='row'>{i + 1}</th>
                <td>{product.product.name}</td>
                <td width='20px'>{product.quantity}</td>
                <td>{product.product.unit}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default TableForEnquiry
