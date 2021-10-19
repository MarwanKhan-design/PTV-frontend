import React from 'react'
import { deleteCompany } from '../api/company'
import Pagination from './Pagination'

const ShowCompanies = ({
  companies,
  setCompanies,
  setPage,
  page,
  totalPages,
}) => {
  const removeCompany = (product, i) => {
    console.log(product)
    deleteCompany(product).then((data) => {
      if (data.error) {
        console.log(data)
      } else {
        const array = [...companies]
        array.indexOf(i)
        if (i !== -1) {
          array.splice(i, 1)
          setCompanies(array)
        }
        console.log(i)
      }
    })
  }

  return (
    <div>
      <h2 className='mt-4'>All Products</h2>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Address</th>
            <th scope='col'>Methods</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((product, i) => {
            return (
              <tr key={i + 1}>
                <th scope='row'>{i + 1}</th>
                <td>{product.name}</td>
                <td>{product.address}</td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => removeCompany(product._id, i)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination setPage={setPage} totalPages={totalPages} page={page} />
    </div>
  )
}

export default ShowCompanies
