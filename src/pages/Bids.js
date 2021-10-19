import React, { useEffect, useState } from 'react'
import { getBids, getBidsByQuotation } from '../api/bids'
import { getQuotations } from '../api/quotation'
import CreateBid from '../components/CreateBid'
import Navbar from '../components/Navbar'
import ShowBids from '../components/ShowBids'
import History from '../components/History'

const Bids = ({ match, location }) => {
  const [bids, setBids] = useState([])
  const [quotations, setQuotations] = useState([])
  const [quotationId, setQuotationId] = useState('')
  const [companyOptions, setCompanyOptions] = useState([])

  useEffect(() => {
    const getQuotationId = async () => {
      const params = new URLSearchParams(location.search)
      const quotationId = await params.get('quotationId')

      setQuotationId(quotationId)
      console.log('quotationId: ' + quotationId)
    }
    getQuotationId()
  }, [])

  const listQuotations = () => {
    getQuotations()
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setQuotations(data)

          data.map(
            (d) =>
              d._id === quotationId &&
              d.companies.map((company) =>
                setCompanyOptions((prevState) => [
                  ...prevState,
                  { label: company.name, value: company._id },
                ])
              )
          )
        }
      })
      .catch((error) => console.log(error))
  }

  const listBids = () => {
    getBidsByQuotation(quotationId)
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setBids(data)
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    quotationId && listQuotations()
    quotationId && listBids()

    document.title = 'Bids'
    console.log(quotationId)
  }, [quotationId])

  return (
    <div>
      <div className='container'>
        <div className='row gx-5'>
          <div className='col-md-6'>
            <ShowBids bids={bids} setBids={setBids} />
          </div>
          <div className='col-md-6'>
            <CreateBid
              bids={bids}
              setBids={setBids}
              quotations={quotations}
              quotationId={quotationId}
              History={History}
              companyOptions={companyOptions}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bids
