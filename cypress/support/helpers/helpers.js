class Helpers {
  postAuthorization(body, qrCode, value) {
    body.qr_code = qrCode
    body.withdrawal_value = value
  }

  makeHeaders(header, data) {
    header.consumer_id = data[`${Cypress.env('environment')}`]['consumer_id']
  }
}
export default new Helpers()
