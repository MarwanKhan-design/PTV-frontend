const API = 'https://project-ptv.herokuapp.com/api'

export const getBids = async () => {
  try {
    const res = await fetch(`${API}/bids`, {
      method: 'GET',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
export const getBidsByQuotation = async (quotation) => {
  try {
    const res = await fetch(`${API}/bids/by/quotation/${quotation}`, {
      method: 'GET',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
export const createBid = (name, quotation, company, prices) => {
  return fetch(`${API}/bid/create`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name, quotation, company, prices }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}
export const deleteBid = async (id) => {
  try {
    const res = await fetch(`${API}/bid/${id}`, {
      method: 'DELETE',
    })
    return await res.json()
  } catch (err) {
    return console.log(err)
  }
}
