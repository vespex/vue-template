import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development'

function checkStatus (res) {
  const { status, data, statusText } = res;

  if (status >= 200 && status < 300) {
    return data;
  }

  const error = new Error(statusText);
  error.res = res;
  throw error;
}

function parseErrorMessage (res) { // 错误处理
  const { status, message, data } = res;

  if (status !== 1) {
    const error = new Error(message);
    error.res = res
    throw error;
  }

  return data;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
const host = ''
export default function request (url, options = {}) {
  if (url.startsWith('/')) {
    url = `${isDev ? '/api' : host}${url}`
  }
  const defaultOptions = {
    credentials: 'include',
    // headers: {
    //   ...,
    //   ...options.headers
    // },
  };
  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }
  return axios(url, newOptions)
    .then(checkStatus)
    .then(parseErrorMessage)
}

export function busyRequest () {
  let busy = false
  return (url, options) => {
    return new Promise((resolve, reject) => {
      if (!busy) {
        busy = true
        request(url, options)
          .then(data => {
            resolve(data)
            busy = false
          })
          .catch(err => {
            reject(err)
            busy = false
          })
      }
    })
  }
}
