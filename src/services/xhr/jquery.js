const API_BASE_PATH = '/api'

/**
 * xhr interface implementation
 * @param   {Object}   req  - Request body
 * @param   {Boolean}  mute - Mute the notification of rejection
 * @resolve {Object}
 * @reject  {Response}
 */
export default function xhr(req, mute) {
  const { method = 'get', url, body = null } = req
  
  return new Promise((resolve, reject) => {
    $.ajax({
      type: method,
      url: API_BASE_PATH + url,
      data: body
      // crossDomain: true,
      // xhrFields: { withCredentials: true }
    })
    .done(res => {
      const { success, message, data } = res
      if (!success) {
        if (!mute) {
          alert('Operation failed: ' + message)
        }
        return reject(res)
      }
      resolve(data)
    })
    .fail(() => {
      alert('Failed to get response from server')
      reject()
    })
  })
}
