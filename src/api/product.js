const API = 'http://localhost:8000/api'

export const getProducts = async () => {
  try {
    const res = await fetch(`${API}/products?skip=2&&limit=3`, {
      method: 'GET',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
export const getPaginatedProducts = async (page, limit) => {
  try {
    const res = await fetch(
      `${API}/products/paginated?page=${page}&limit=${limit}`,
      {
        method: 'GET',
      }
    )
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}

export const createProduct = (name, unit, user) => {
  return fetch(`${API}/product/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name, unit, user }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API}/product/${id}`, {
      method: 'DELETE',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
