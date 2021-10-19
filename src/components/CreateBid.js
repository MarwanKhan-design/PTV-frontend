import React, { useState } from 'react'
import { useEffect } from 'react'
import { createBid } from '../api/bids'
import { singleQuotation } from '../api/quotation'
import CustomSelect from './CustomSelect'

const CreateBid = ({ setBids, quotations, quotationId, companyOptions }) => {
  const [quotation, setQuotation] = useState({})
  const [bid, setBid] = useState({
    name: '',
    quotation: '',
    company: '',
  })
  const [pricesArray, setPricesArray] = useState([])
  const [company, setCompany] = useState({})
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    console.log(quotationId)
    setBid({ ...bid, quotation: quotationId })
  }, [quotationId])

  const getSingleQuotation = (quotationId) => {
    singleQuotation(quotationId)
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setQuotation(data)
        }
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    quotationId && getSingleQuotation(quotationId)
    console.log(quotation.products)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bid.quotation])

  useEffect(() => {
    quotation.products &&
      quotation.products.map((product, i) => {
        console.log(product)
        changeBidPrices(0, product.product._id, i)
        return <></>
      })
    console.log(pricesArray)
  }, [quotation.products])

  useEffect(() => {
    quotation.companies &&
      quotation.companies.map(
        (company) => company._id === bid.company && setCompany(company)
      )

    console.log('Bid name set')
    setBid({
      ...bid,
      name: `Bid For ${quotation && quotation.name} By ${
        company && company.name
      }`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotation, bid.company, company])

  const create = async (e) => {
    e.preventDefault()
    const { name, quotation, company } = bid
    await createBid(name, quotation, company, pricesArray).then((data) => {
      if (data.error) {
        console.log(data.error)
        setSuccess(false)
        setError(true)
      } else {
        setSuccess(true)
        setError(false)
        setBids((prevState) => [data, ...prevState])
      }
    })
  }

  const showSuccess = (success) => {
    return (
      success && (
        <div className='alert alert-info' role='alert'>
          Bid was created
        </div>
      )
    )
  }
  const showError = (error) => {
    return (
      error && (
        <div className='alert alert-danger' role='alert'>
          Bid Already Exists
        </div>
      )
    )
  }

  const changeBidPrices = async (price, product, i) => {
    if (pricesArray.length <= i) {
      console.log('create')
      return setPricesArray((prevState) => [
        ...prevState,
        { product: product, price: price },
      ])
    } else {
      pricesArray[i].price = price
      console.log('update')
      return setPricesArray([...pricesArray], pricesArray)
    }
  }

  return (
    <>
      <h2 className='mt-4'>Create Bid</h2>
      {showSuccess(success)}
      {showError(error)}
      <form className='form-floating mt-4'>
        <input
          type='hidden'
          value={bid.name}
          onChange={(e) => setBid({ ...bid, name: e.target.value })}
          required={true}
        />
        <br />
        <div>
          <select
            className='form-select form-select-md mb-3'
            value={bid.quotation}
            aria-label='Disabled select example'
            disabled
          >
            <option>Choose a Quotation</option>
            {quotations.map((quotation, i) => {
              // console.log(quotation)
              return (
                <>
                  <option value={quotation._id}>{quotation.name}</option>
                </>
              )
            })}
          </select>
        </div>
        <div>
          <CustomSelect
            className='form-select form-select-md mb-3'
            aria-label='.form-select-lg example'
            options={companyOptions}
            placeholder='Select a Company'
            onChangeInput={(value) => {
              setBid({ ...bid, company: value.value })
            }}
            isMulti={false}
          />
        </div>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Price</th>
            </tr>
          </thead>
          <tbody>
            {quotation.companies &&
              bid.company &&
              quotation.products.map((product, i) => {
                let isValueEntered = false
                let priceValue = 0

                return (
                  <tr key={i}>
                    <th scope='row'>{i + 1}</th>
                    <td>{product.product.name}</td>
                    <td>
                      {isValueEntered ? (
                        <></>
                      ) : (
                        <>
                          <input
                            type='number'
                            className='form-control'
                            placeholder='Price'
                            onChange={(e) => {
                              priceValue = e.target.value
                              changeBidPrices(
                                priceValue,
                                product.product._id,
                                i
                              )
                            }}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        <button
          type='submit'
          className='btn btn-primary mt-2'
          onClick={(e) => {
            create(e)
          }}
        >
          Create Bid
        </button>
      </form>
    </>
  )
}

export default CreateBid
