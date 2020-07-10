
export const getUserInfoApi = () => {
  return fetch(`https://jsonplaceholder.typicode.com/users`)
    .then(res => res.json())
    .catch((err) => console.log(err))
}

export const getUserInfoByIdApi = (id) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => res.json())
    .catch((err) => console.log(err))
}
