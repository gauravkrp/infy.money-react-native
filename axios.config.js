import axios from 'axios';
import { API_URL, API_URL_PROD } from '@env';

const apiBaseURL = `${API_URL_PROD}`;

const COMMON_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

// global api axios config
const apiInstance = axios.create({
  baseURL: apiBaseURL,
  timeout: 90000,
  headers: COMMON_HEADERS,
  // validateStatus: function (status) {
  //   return status < 600; // Resolve only if the status code is less than 600
  // }
});

const setAuthToken = (token) => {
  if (token) {
    //applying token
    apiInstance.defaults.headers.common['Authorization'] = token;
  } else {
    //deleting the token from header
    delete apiInstance.defaults.headers.common['Authorization'];
  }
};

// if calls made being without auth token
apiInstance.interceptors.request.use(
  req => {
    return req;
    // if (axios.defaults.headers.common["Authorization"]) return req;
    // throw ({ message: "the token is not available" });
  },
  error => {
    return Promise.reject(error);
  },
);

//on successful response
apiInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log('intercepted response-', response, response.status);
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const fallbackValue = [{
    //   userId: "Not authorized", id: "aerw15311sq",
    //   title: "Please try again", completed: false
    // }];
    // return Promise.reject(fallbackValue);
    // return Promise.reject({
    //   ...error.response.data,
    //   status: error.response.status,
    // });
    console.log(error);
    console.log(error.response);
    if (error.response) return Promise.resolve(error.response.data);
    return Promise.reject({
      // error object,
      status: false,
      message: error.message,
      stack: error.stack,
      isAxiosError: error.isAxiosError,
    });
  },
);

// API Call Defintion
const API_CALL = (
  //API_INSTANCE: any = apiInstance,
  API_ROUTE,
  METHOD = 'GET',
  DATA = null,
  HEADERS = COMMON_HEADERS,
  AUTHORIZATION = null,
) => {
  const API_OPTIONS = {
    method: METHOD,
    headers: HEADERS,
  };

  if (METHOD === ('PUT' || 'PATCH') && DATA === null) {
    throw new Error(`Please send data for ${API_ROUTE} - ${METHOD} call`);
  }

  if (DATA) API_OPTIONS.data = JSON.stringify(DATA);

  AUTHORIZATION ? (API_OPTIONS.headers = { ...API_OPTIONS.headers, AUTHORIZATION }) : null;

  return apiInstance({
    url: API_ROUTE,
    ...API_OPTIONS,
  });
};

const apiConfig = {
  apiBaseURL,
  apiInstance,
  setAuthToken,
  COMMON_HEADERS,
  API_CALL,
};

export default apiConfig;
