import React, { useEffect, useState } from 'react'
import { getCompanies } from '../api/company'
import { getProducts } from '../api/product'
import { getQuotations, getQuotationsPaginated } from '../api/quotation'
import CreateQuotation from '../components/CreateQuotation'
import Navbar from '../components/Navbar'
import ShowQuotations from '../components/ShowQuotations'

const Quotations = () => {
  const [quotations, setQuotations] = useState([])
  const [companies, setCompanies] = useState([])
  const [products, setProducts] = useState([])
  const [productOptions, setProductOptions] = useState([])
  const [companyOptions, setCompanyOptions] = useState([])
  const [quotationToUpdate, setQuotationToUpdate] = useState({
    _id: '',
    name: '',
    products: [],
    companies: [],
    lastDate: '',
    index: '',
  })
  const [quotationUpdateOrCreate, setQuotationUpdateOrCreate] = useState(false)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [totalPages, setTotalPages] = useState()

  const listQuotations = () => {
    getQuotationsPaginated(page, limit)
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setQuotations(data.results)
          setTotalPages(data.totalPages)
          console.log('Result ' + data.results)
        }
      })
      .catch((error) => console.log(error))
  }

  const listProducts = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setProducts(data)
          data.map((product) =>
            setProductOptions((prevState) => {
              return [...prevState, { label: product.name, value: product._id }]
            })
          )
        }
      })
      .catch((error) => console.log(error))
  }
  const listCompanies = () => {
    getCompanies()
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setCompanies(data)
          data.map((company) =>
            setCompanyOptions((prevState) => {
              return [...prevState, { label: company.name, value: company._id }]
            })
          )
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    listQuotations()
  }, [page, limit])
  useEffect(() => {
    listProducts()
    listCompanies()
    document.title = 'Quotations'
  }, [])

  return (
    <div>
      <div className='container'>
        <div className='row gx-5'>
          <div className='col-md-6'>
            <ShowQuotations
              quotations={quotations}
              setQuotations={setQuotations}
              setQuotationUpdateOrCreate={setQuotationUpdateOrCreate}
              quotationUpdateOrCreate={quotationUpdateOrCreate}
              setQuotationToUpdate={setQuotationToUpdate}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          </div>
          <div className='col-md-6'>
            <CreateQuotation
              setQuotations={setQuotations}
              setQuotationToUpdate={setQuotationToUpdate}
              setQuotationUpdateOrCreate={setQuotationUpdateOrCreate}
              productOptions={productOptions}
              companiesOptions={companyOptions}
              quotationToUpdate={quotationToUpdate}
              quotationUpdateOrCreate={quotationUpdateOrCreate}
              listProducts={listProducts}
              listCompanies={listCompanies}
              quotations={quotations}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quotations
