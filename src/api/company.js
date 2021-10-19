const API = 'http://localhost:8000/api'

export const getCompanies = async () => {
  try {
    const res = await fetch(`${API}/companies`, {
      method: 'GET',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
export const getCompaniesPaginated = async (page, limit) => {
  try {
    const res = await fetch(
      `${API}/companies/paginated?page=${page}&limit=${limit}`,
      {
        method: 'GET',
      }
    )
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
export const SingleCompany = async (id) => {
  try {
    const res = await fetch(`${API}/company/${id}`, {
      method: 'GET',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
export const createCompany = (name, address) => {
  return fetch(`${API}/company/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name, address }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}
export const deleteCompany = async (id) => {
  try {
    const res = await fetch(`${API}/company/${id}`, {
      method: 'DELETE',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
