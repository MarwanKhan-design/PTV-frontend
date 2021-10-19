import React, { useState } from 'react'
import { useEffect } from 'react'
import { getCompanies, getCompaniesPaginated } from '../api/company'
import CreateCompany from '../components/CreateCompany'
import Navbar from '../components/Navbar'
import ShowCompanies from '../components/ShowCompanies'

const Companies = () => {
  const [companies, setCompanies] = useState([])

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(7)
  const [totalPages, setTotalPages] = useState()

  const listCompanies = async () => {
    await getCompaniesPaginated(page, limit)
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setCompanies(data.results)
          setTotalPages(data.totalPages)
          console.log(data)
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    listCompanies()
    document.title = 'Companies'
  }, [page, limit])

  return (
    <div>
      <div className='container'>
        <div className='row gx-5'>
          <div className='col-md-6'>
            <ShowCompanies
              companies={companies}
              setCompanies={setCompanies}
              setPage={setPage}
              page={page}
              totalPages={totalPages}
            />
          </div>
          <div className='col-md-6'>
            <CreateCompany companies={companies} setCompanies={setCompanies} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Companies
