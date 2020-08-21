import axios from 'axios';

const URL_AUTH = 'http://localhost:8888';
const URL_PRODS = 'http://localhost:8080';

export const service = {
  login,
  logout,
  register,
  getProducts,
  addProduct,
  deleteProduct,
  replace
};

//замена json для проверки функционала
function replace(json) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json' },
    body: json
  };
  return axios
    .post(`${URL_PRODS}/products`, requestOptions.body, requestOptions.headers)
    .then(res => {
      return res.data.products;
    })
    .catch(error => {
      handleResponse(error.response);
    });
}


function login(user) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json' },
    body: user
  };

  return axios
    .post(`${URL_AUTH}/login`, requestOptions.body, requestOptions.headers)
    .then(handleResponse)
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res));
      return res.user;
    });
}

function register(user) {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json' },
    body: user
  };
  return axios
    .post(`${URL_AUTH}/signup`, requestOptions.body, requestOptions.headers)
    .then(handleResponse)
    .then(res => {
      localStorage.setItem('user', JSON.stringify(res));
      return res.user;
    });
}


function logout(refreshToken) {
  // axios
  //   .post(`${URL_AUTH}/logout`, { refreshToken })
  //   .then(response => {
  localStorage.removeItem('user');
  //   return response.status;
  // })
}

// function refreshToken(refreshToken) {
//   return axios
//     .post(`${URL_AUTH}/token`, { refreshToken })
//     .then(response => {
//       if (response.data.success) {
//         let user = JSON.parse(localStorage.getItem('user'));
//         user.authToken = response.data.authToken;
//         localStorage.setItem('user', JSON.stringify(user));

//         return response.data.authToken;
//       }
//     })
//     .catch(error => {
//       handleResponse(error.response);
//     });
// }

function getProducts() {
  const requestOptions = {
    headers: { 'Content-Type': 'application/json' }
  };

  return axios
    .get(`${URL_PRODS}/products`, requestOptions.headers)
    .then(res => {
      return res.data.products;
    })
    .catch(error => {
    });
}

function addProduct(product) {
  console.log(product);
  const requestOptions = {
    headers: { 'Content-Type': 'application/json' },
    body: product
  };

  return axios
    .post(`${URL_PRODS}/product`, requestOptions.body, requestOptions.headers)
    .then(res => {
      console.log(res);
      return res.data.product;
    });
}

function deleteProduct(id) {
  return axios
    .delete(`${URL_PRODS}/product/${id}`)
    .then(res => {
      return res.data.products;
    })
    .catch(error => {
    });
}

function handleResponse(response) {
  if (response.data.accessToken === undefined || response.data.accessToken === null) {
    alert("ERROR", response.data.accessToken);
  }
  console.log(response.data, "DATA");
  return response.data;
}