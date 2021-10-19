import React, { Fragment, useEffect, useState, Component, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { singleQuotation } from '../api/quotation'
import Navbar from '../components/Navbar'
import TableForEnquiry from '../components/TableForEnquiry'

export class PurchaseEnquiryForCompany extends Component {
  render() {
    const { companyId, quotation, date } = this.props
    return (
      <div className='m-5'>
        <center>
          <h4>Pakistan Television Corporation Limited</h4>
          <h4>Peshawar Center</h4>
        </center>
        <div className='container'>
          <div className='row'>
            <div className='col-8'>
              <table className='table mt-3'>
                {companyId &&
                  quotation.companies &&
                  quotation.companies.map(
                    (company) =>
                      company._id === companyId && (
                        <Fragment key={company._id}>
                          <tr className='fw-bold text-decoration-underline'>
                            <td>{company.name}</td>
                          </tr>
                        </Fragment>
                      )
                  )}
              </table>
            </div>
            <div className='col-4'>
              <table className='table mt-3'>
                <tr>
                  <td>TEL: 091-9211889-98</td>
                </tr>
                <tr>
                  <td className='fw-bold text-decoration-underline'>
                    Ref: {quotation && quotation.name}
                  </td>
                </tr>
                <tr>
                  <td>
                    Date: {date.getDate()}/{date.getMonth() + 1}/
                    {date.getFullYear()}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className=''>
          <h3 className='text-center'>Purchase Enquiry</h3>
          <p>Dear, Sir</p>
          <p>
            We shall oblige if you will let us have your lowest quotation of the
            following goods.
          </p>
        </div>
        <TableForEnquiry quotation={quotation} />
        <p style={{ fontSize: 11 }}>
          Please indicate your earliest delivery date. Your Sealed/Registered
          Quotation must reach the office of the <br /> General Manager PTV
          Peshawar by 12 noon before, {quotation.lastDate} And put the original
          tender in one envelope which <br /> be sealed and placed inside
          another cover. Outside cover shall also be sealed. <br /> Please write
          the word “QUOTATION” on the top of envelope and our Ref. # as well and
          also your address <br /> Payment will be made 100% on receipt of goods
          by the consignee in good condition after inspection <br /> Please note
          that the corporation reserve the right to reject all the quotation
          without showing any cause <br /> Please quote your GST and National
          Tax Number <br /> Final Payment will be made after providing Annexure
          C.
        </p>
      </div>
    )
  }
}

const PurchaseEnquiryForCompanyPrint = ({ match }) => {
  const [quotation, setQuotation] = useState({})
  const [quotationId, setQuotationId] = useState(match.params.quotationId)
  const [companyId, setCompanyId] = useState(match.params.companyId)
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
      <PurchaseEnquiryForCompany
        ref={componentRef}
        companyId={companyId}
        quotation={quotation}
        date={date}
      />
      <br />
    </>
  )
}

export default PurchaseEnquiryForCompanyPrint
