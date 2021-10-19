import React, { useState } from 'react'
import { createCompany } from '../api/company'

const CreateCompany = ({ companies, setCompanies }) => {
  const [company, setCompany] = useState({ name: '', address: '' })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const create = async (e) => {
    e.preventDefault()

    await createCompany(company.name, company.address).then((data) => {
      if (data.error) {
        console.log(data.error)
        setSuccess(false)
        setError(true)
      } else {
        setSuccess(true)
        setError(false)
        setCompanies((prevState) => [company, ...prevState])
        setCompany({ name: '', address: '' })
      }
    })
  }

  const showSuccess = (success) => {
    return (
      success && (
        <div className='alert alert-info' role='alert'>
          Company was created
        </div>
      )
    )
  }
  const showError = (error) => {
    return (
      error && (
        <div className='alert alert-danger' role='alert'>
          Company Already Exists
        </div>
      )
    )
  }
  return (
    <div>
      <>
        <h2 className='mt-4'>Create Company</h2>
        {showSuccess(success)}
        {showError(error)}
        <form className='mt-4'>
          <div className='form-floating mb-3'>
            <input
              type='text'
              className={`form-control ${error && 'is-invalid'}`}
              id='floatingInputValue'
              placeholder='Name'
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
              required={true}
            />
            <label for='floatingInputValue'>Name</label>
          </div>
          <div className='form-floating'>
            <input
              type='text'
              className={`form-control ${error && 'is-invalid'}`}
              id='floatingInputValue'
              placeholder='Name'
              value={company.address}
              onChange={(e) =>
                setCompany({ ...company, address: e.target.value })
              }
              required={true}
            />
            <label for='floatingInputValue'>Address</label>
          </div>
          <button
            type='submit'
            className='btn btn-primary mt-2'
            onClick={(e) => create(e)}
          >
            Create Company
          </button>
        </form>
      </>
    </div>
  )
}

export default CreateCompany
