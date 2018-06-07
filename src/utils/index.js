
export default {
  url (api) {
    api += '?t=' + +new Date()
    return api
  },
  zUrl (url) {
    let host = process.env.NODE_ENV === 'production' ? '//z.dian.so' : '//zdev.dian.so'
    return host + url
  }
}
