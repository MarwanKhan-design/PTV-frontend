import React, { useEffect, useState } from 'react'
import { createQuotation, updateQuotation } from '../api/quotation'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomSelect from './CustomSelect'

const CreateQuotation = ({
  setQuotations,
  quotations,
  productOptions,
  companiesOptions,
  quotationToUpdate,
  setQuotationToUpdate,
  setQuotationUpdateOrCreate,
  quotationUpdateOrCreate,
}) => {
  const [quotation, setQuotation] = useState({
    name: '',
    products: [],
    companies: [],
    lastDate: '',
  })
  const [checkedProducts, setCheckedProducts] = useState([])
  const [checkedCompanies, setCheckedCompanies] = useState([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setQuotation({
      ...quotation,
      name: quotationUpdateOrCreate ? quotationToUpdate.name : '',
    })
  }, [quotationToUpdate.name, quotationUpdateOrCreate])

  useEffect(() => {
    quotationUpdateOrCreate && setCheckedProducts(quotationToUpdate.products)
  }, [quotationUpdateOrCreate])

  const update = async (e) => {
    e.preventDefault()
    const { name, lastDate } = quotation
    const { index } = quotationToUpdate
    await updateQuotation(
      name,
      checkedProducts,
      checkedCompanies,
      lastDate,
      quotationToUpdate._id
    ).then((data) => {
      if (data.error) {
        console.log(data.error)
        setSuccess(false)
        setError(true)
      } else {
        // setQuotations((prevState) => [data, ...prevState])
        quotations[index] = data
        setQuotation({
          name: '',
          id: '',
          products: [],
          companies: [],
          lastDate: null,
        })
        setCheckedCompanies([])
        setCheckedProducts([])
      }
      setQuotationToUpdate('')
      setQuotationUpdateOrCreate(false)
    })
  }

  const create = async (e) => {
    e.preventDefault()

    const { name, lastDate } = quotation
    await createQuotation(
      name,
      checkedProducts,
      checkedCompanies,
      lastDate
    ).then((data) => {
      if (data.error) {
        console.log(data.error)
        setSuccess(false)
        setError(true)
      } else {
        setSuccess(true)
        setError(false)
        setQuotations((prevState) => [data, ...prevState])
        setQuotation({
          name: '',
          id: '',
          products: [],
          companies: [],
          lastDate: null,
        })
        setCheckedCompanies([])
        setCheckedProducts([])
      }
    })
  }

  const showSuccess = (success) => {
    return (
      success && (
        <div className='alert alert-info' role='alert'>
          Quotation was created
        </div>
      )
    )
  }
  const showError = (error) => {
    return (
      error && (
        <div className='alert alert-danger' role='alert'>
          Quotation Already Exists
        </div>
      )
    )
  }

  const changeQuantity = async (quantity, product, i) => {
    // const singleProduct = checkedProducts.find({ product: product._id })
    console.log(quantity)

    checkedProducts.map((mappedProduct) => {
      mappedProduct.product === product.product &&
        (mappedProduct.quantity = quantity)
    })
    // checkedProducts[i].quantity = quantity
    // singleProduct.quantity = quantity
    console.log('update')
    return setCheckedProducts([...checkedProducts], checkedProducts)
  }

  return (
    <>
      <h2 className='mt-4'>Create Quotation</h2>
      {showSuccess(success)}
      {showError(error)}
      <form className='mt-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-floating mb-3'>
                <input
                  type='text'
                  className={`form-control ${error && 'is-invalid'}`}
                  id='floatingInputValue'
                  placeholder='Name'
                  value={
                    quotationUpdateOrCreate
                      ? quotationToUpdate.name
                      : quotation.name
                  }
                  onChange={(e) =>
                    setQuotation({ ...quotation, name: e.target.value })
                  }
                  required={true}
                />
                <label for='floatingInputValue'>Name</label>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-floating mb-3'>
                <DatePicker
                  selected={quotation.lastDate}
                  dateFormat='yyyy/MM/dd'
                  onChange={(date) =>
                    setQuotation({ ...quotation, lastDate: date })
                  }
                  minDate={new Date()}
                  isClearable={true}
                  placeholderText='Select Last Date'
                  className='form-control'
                />
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row gx-5'>
            <div className='col-md-6'>
              <CustomSelect
                options={productOptions}
                isMulti={true}
                // label='Products'
                placeholder='Select Products'
                onChangeInput={(value) => {
                  setCheckedProducts(
                    value.map((v) => ({
                      product: v.value,
                      quantity: 0,
                      name: v.label,
                    }))
                  )
                }}
              />
              {checkedProducts.map((product, i) => {
                let quantity = 0
                return (
                  <>
                    <label>{product.name}</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Quantity'
                      onChange={(e) => {
                        quantity = e.target.value
                        changeQuantity(quantity, product, i)
                      }}
                    />
                  </>
                )
              })}
            </div>
            <div className='col-md-6'>
              <CustomSelect
                options={companiesOptions}
                isMulti={true}
                placeholder='Select Companies'
                onChangeInput={(value) =>
                  setCheckedCompanies(value.map((v) => v.value))
                }
                // defaultValue={[companiesOptions[0]]}
              />
            </div>
          </div>
        </div>

        {quotationUpdateOrCreate ? (
          <button
            type='submit'
            className='btn btn-primary mt-2'
            onClick={(e) => update(e)}
          >
            Update Quotation
          </button>
        ) : (
          <button
            type='submit'
            className='btn btn-primary mt-2'
            onClick={(e) => create(e)}
          >
            Create Quotation
          </button>
        )}
      </form>
    </>
  )
}

export default CreateQuotation
