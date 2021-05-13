import helpers from '../helpers/helpers'

class Request24horas {
  getLimiteSaque() {
    cy.fixture('schema-24-hrs').then((data) => {
      helpers.makeHeaders(data.headersLimites, data.data)
      cy.makeBodyRequest(
        Cypress.env('24-hrs-url'),
        'GET',
        data.headersLimites,
        '',
      )
        .as('limiteSaque')
        .then((res) => {
          globalThis.limiteSaque = res.body.available_withdrawal_value
          globalThis.taxaSaque = res.body.withdrawal_fee
          globalThis.saqueGratis = res.body.available_num_free_withdrawals
        })
    })
  }
  postCriarSaque(valorSaque) {
    cy.fixture('schema-24-hrs').then((data) => {
      helpers.makeHeaders(data.headersAuthorization, data.data)
      helpers.postAuthorization(data.bodyAuthorization, globalThis.qrcode, valorSaque)
      cy.makeBodyRequest(
        `${Cypress.env('24-hrs-url')}/authorization`,
        'POST',
        data.headersAuthorization,
        data.bodyAuthorization,
      ).as('criarSaque')
    })
  }
  postCriarSaqueMaiorQueSaldoDia(valorSaque) {
    cy.fixture('schema-24-hrs').then((data) => {
      helpers.makeHeaders(data.headersAuthorization, data.data)
      helpers.postAuthorization(data.bodyAuthorization, globalThis.qrcode, valorSaque)
      cy.makeBodyRequest(
        `${Cypress.env('24-hrs-url')}/authorization`,
        'POST',
        data.headersAuthorization,
        data.bodyAuthorization,
      ).as('criarSaqueMaiorQueSaldoDia')
    })
  }

  postCriarSaqueMenorQue20(valorSaque) {
    cy.fixture('schema-24-hrs').then((data) => {
      helpers.makeHeaders(data.headersAuthorization, data.data)
      helpers.postAuthorization(data.bodyAuthorization, globalThis.qrcode, valorSaque)
      cy.makeBodyRequest(
        `${Cypress.env('24-hrs-url')}/authorization`,
        'POST',
        data.headersAuthorization,
        data.bodyAuthorization,
      ).as('criarSaqueMenorQue20')
    })
  }

  postCriarSaqueIgual0(valorSaque) {
    cy.fixture('schema-24-hrs').then((data) => {
      helpers.makeHeaders(data.headersAuthorization, data.data)
      helpers.postAuthorization(data.bodyAuthorization, globalThis.qrcode, valorSaque)
      cy.makeBodyRequest(
        `${Cypress.env('24-hrs-url')}/authorization`,
        'POST',
        data.headersAuthorization,
        data.bodyAuthorization,
      ).as('criarSaqueIgual0')
    })
  }

  postCriarSaqueVazio(valorSaque) {
    cy.fixture('schema-24-hrs').then((data) => {
      helpers.makeHeaders(data.headersAuthorization, data.data)
      helpers.postAuthorization(data.bodyAuthorization, globalThis.qrcode, valorSaque)
      cy.makeBodyRequest(
        `${Cypress.env('24-hrs-url')}/authorization`,
        'POST',
        data.headersAuthorization,
        data.bodyAuthorization,
      ).as('criarSaqueVazio')
    })
  }

} export default new Request24horas()