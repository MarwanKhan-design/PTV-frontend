import React, { Fragment, useState } from 'react'
import { useEffect } from 'react'
import { deleteBid, getBids } from '../api/bids'
import { getQuotations, singleQuotation } from '../api/quotation'
import Navbar from '../components/Navbar'
import TableForQuotations from '../components/TableForQuotations'
import { Link } from 'react-router-dom'

const BidsByQuotation = () => {
  const [bids, setBids] = useState([])
  const [quotation, setQuotation] = useState({})
  const [selectedQuotation, setSelectedQuotation] = useState(
    '6137419a6656ae4b04a206b4'
  )
  const [quotations, setQuotations] = useState([])

  const listQuotations = () => {
    getQuotations()
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setQuotations(data)
        }
      })
      .catch((error) => console.log(error))
  }

  const listBids = () => {
    getBids()
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
    singleQuotation(selectedQuotation)
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setQuotation(data)
        }
      })
      .catch((error) => console.log(error))
  }

  // const listCompaniesArray = () => {
  //   bids.map((bid) => setCompaniesArray([...companiesArray, bid._id]))
  //   return
  // }

  useEffect(() => {
    listBids()
    listQuotations()
    document.title = 'All Quotations'
    // getSingleQuotation()
    // console.log(quotation)
    // listCompaniesArray()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuotation])

  const removeBid = (bid, i) => {
    console.log(bid)
    deleteBid(bid).then((data) => {
      if (data.error) {
        console.log(data)
        // setSuccess(false)
        // setError(true)
      } else {
        // setSuccess(true)
        // setError(false)
        const array = [...bids]
        array.indexOf(i)
        if (i !== -1) {
          array.splice(i, 1)
          setBids(array)
        }
        // products.splice(i, 1)
        console.log(i)
      }
    })
  }
  return (
    <>
      <div className='container'>
        {quotations &&
          quotations.map((singleQuotation) => (
            <>
              <Link to={`/quotation/${singleQuotation._id}`}>
                <h2 className='mt-3'>{singleQuotation.name}</h2>
              </Link>
              <TableForQuotations
                singleQuotation={singleQuotation}
                bids={bids}
              />
            </>
          ))}
      </div>
    </>
  )
}

export default BidsByQuotation
