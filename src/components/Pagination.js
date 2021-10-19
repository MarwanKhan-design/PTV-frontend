import React, { useEffect, useState } from 'react'

const Pagination = ({ setPage, totalPages, page }) => {
  const [totalPagesArray, setTotalPagesArray] = useState([])

  useEffect(() => {
    for (let index = 1; index <= totalPages + 1; index++) {
      if (index < totalPages + 1) {
        console.log('Page Added: ' + index)
        setTotalPagesArray((prevState) => [...prevState, index])
      }
    }
    console.log('Total Pages: ' + totalPages)
  }, [totalPages])

  return (
    <>
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          <li
            className={`page-item ${page === 1 && 'disabled'}`}
            onClick={() => {
              if (page !== 1) {
                setPage((prevState) => prevState - 1)
              }
            }}
          >
            <a className='page-link' href='#' aria-label='Previous'>
              <span aria-hidden='true'>&laquo;</span>
            </a>
          </li>

          {totalPagesArray.map((page) => (
            <li className='page-item' onClick={() => setPage(page)}>
              <p className='page-link'>{page}</p>
            </li>
          ))}

          <li
            className={`page-item ${page === totalPages && 'disabled'}`}
            onClick={() => {
              if (page !== totalPages) {
                setPage((prevState) => prevState + 1)
              }
            }}
          >
            <a className='page-link' href='#' aria-label='Next'>
              <span aria-hidden='true'>&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination
