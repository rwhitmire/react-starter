/**
 * Fetch wrapper for making REST API calls
 */

export function fetchJSON(url, opts={}) {
  opts.headers = opts.headers || {}
  opts.headers.Accept = 'application/json'

  return fetch(url, opts)
    .then(res => {
      if(res.status >= 200 && res.status < 300) {
        return res
      }

      const err = new Error(res.statusText || res.status)
      err.response = res
      throw err
    })
    .then(res => {
      return res.json()
    })
}
