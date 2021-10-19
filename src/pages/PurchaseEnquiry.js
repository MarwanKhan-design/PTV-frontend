import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { singleQuotation } from '../api/quotation'
import Navbar from '../components/Navbar'
import TableForEnquiry from '../components/TableForEnquiry'
import ReactToPrint from 'react-to-print'
import EnquiryToPrint from '../components/EnquiryToPrint'

const PurchaseEnquiryPrint = ({ match }) => {
  const [quotation, setQuotation] = useState({})
  const [quotationId, setQuotationId] = useState(match.params.quotationId)
  const [date, setDate] = useState(new Date())
  const componentRef = useRef()

  const getSingleQuotation = () => {
    singleQuotation(quotationId)
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setQuotation(data)
          document.title = data.name
        }
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    quotationId && getSingleQuotation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotationId])
  return (
    <>
      <ReactToPrint
        trigger={() => (
          <center>
            <button className='center mt-3 btn btn-primary'>
              Print this out!
            </button>
          </center>
        )}
        content={() => componentRef.current}
      />
      <EnquiryToPrint ref={componentRef} quotation={quotation} date={date} />
    </>
  )
}

export default PurchaseEnquiryPrint
