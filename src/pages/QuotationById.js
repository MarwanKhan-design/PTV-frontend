import React, { useEffect, useState, Component, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { getBidsByQuotation } from '../api/bids'
import { singleQuotation } from '../api/quotation'
import TableForComparison from '../components/TableForComparison'

export class QuotationById extends Component {
  render() {
    const { quotation, bids } = this.props
    return (
      <div className='m-5'>
        <h4 className='text-center mt-3 fs-4'>
          COMPARATIVE STATEMENT OF QUOTATION FOR
        </h4>
        <TableForComparison singleQuotation={quotation} bids={bids} />
      </div>
    )
  }
}

const QuotationByIdPrint = ({ match }) => {
  const quotationId = match.params.quotationId

  const [bids, setBids] = useState([])
  const [quotation, setQuotation] = useState({})
  const componentRef = useRef()
  const pageStyle = '@page { size: A4 landscape }'

  const listBids = () => {
    getBidsByQuotation(quotationId)
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setBids(data)
          console.log(data)
        }
      })
      .catch((error) => console.log(error))
  }

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
    listBids()
    getSingleQuotation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
        pageStyle={pageStyle}
      />
      <QuotationById ref={componentRef} quotation={quotation} bids={bids} />
      <br />
    </>
  )
}

export default QuotationByIdPrint
