export const BASE_URL = 'https://api.ilyazhulanov.students.nomoredomains.rocks';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      email})
  })
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response.status);
  })
  .then((res) => {
    return res;
  })
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      email})
  })
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response.status);
  })
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response.status);
  })
  .then(data => data)
};