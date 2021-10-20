const API = 'https://project-ptv.herokuapp.com/api'

export const getQuotations = async () => {
  try {
    const res = await fetch(`${API}/quotations`, {
      method: 'GET',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
export const getQuotationsPaginated = async (page, limit) => {
  try {
    const res = await fetch(
      `${API}/quotations/paginated?page=${page}&limit=${limit}`,
      {
        method: 'GET',
      }
    )
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}

export const createQuotation = (name, products, companies, lastDate) => {
  return fetch(`${API}/quotation/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name, products, companies, lastDate }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}
export const updateQuotation = (
  name,
  products,
  companies,
  lastDate,
  quotationId
) => {
  return fetch(`${API}/quotation/${quotationId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name, products, companies, lastDate }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export const singleQuotation = async (id) => {
  try {
    const res = await fetch(`${API}/quotation/${id}`, {
      method: 'GET',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}

export const deleteQuotation = async (id) => {
  try {
    const res = await fetch(`${API}/quotation/${id}`, {
      method: 'DELETE',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
