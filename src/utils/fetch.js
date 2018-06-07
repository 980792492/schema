
import Util from './utils'
import assign from 'object-assign'
require('es6-promise').polyfill()
require('isomorphic-fetch')

let wrapEndpoint = (action) => {
  if (action.method.toUpperCase() === 'GET') {
    return Util.url(action.endpoint) + ('&data=' + encodeURIComponent(JSON.stringify(action.body || {})))
  } else {
    return Util.url(action.endpoint)
  }
}

let wrapAction = (action) => {
  return assign({
    type: action.type,
    endpoint: wrapEndpoint(action),
    requestData: action.body || {}
  }, action.method.toUpperCase() === 'POST' ? {
    body: 'data=' + encodeURIComponent(JSON.stringify(action.body) || {}),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    credentials: 'include',
    method: 'post',
    requestData: action.body || {}
  } : {credentials: 'include'})
}

export {
 wrapAction
}
