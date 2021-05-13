import assertion from '../support/assertions/assertion.js'
import request from '../support/requests/requests'

const consumer_id = 26066450

context('Fluxo de retirada de valor da carteira pelo Banco 24 horas', () => {
  describe('Retirar valor da carteira pelo Banco 24 horas', () => {
    before(() => {
      cy.exec(`python3 cypress/support/scripts/qrcode-24h.py`, {
        failOnNonZeroExit: false,
      }).then((result) => {
        globalThis.qrcode = result.stdout
      })
    })
    it('POSITIVO - Retirar valor menor que saldo', () => {
      cy.log(globalThis.qrcode)
      const valorSaque = 20

      request.getLimiteSaque()
      request.postCriarSaque(valorSaque)

      assertion.limiteSaque(200)
      assertion.criarSaque(200, valorSaque)
    })

    it('NEGATIVO - Retirar valor maior que saldo do dia', () => {
      cy.log(globalThis.qrcode)
      const valorSaque = 1010

      request.getLimiteSaque()
      request.postCriarSaqueMaiorQueSaldoDia(valorSaque)

      assertion.limiteSaque(200)
      assertion.criarSaqueMaiorQueSaldoDia(400, valorSaque)


    })

    it('NEGATIVO - Retirar valor menor que o permitido', () => {
      cy.log(globalThis.qrcode)
      const valorSaque = 19

      request.getLimiteSaque()
      request.postCriarSaqueMenorQue20(valorSaque)

      assertion.limiteSaque(200)
      assertion.criarSaqueMenorQue20(400, valorSaque)
    })

    it('NEGATIVO - Retirar valor menor que o permitido', () => {
      cy.log(globalThis.qrcode)
      const valorSaque = 19

      request.getLimiteSaque()
      request.postCriarSaqueMenorQue20(valorSaque)

      assertion.limiteSaque(200)
      assertion.criarSaqueMenorQue20(400, valorSaque)
    })

    it('NEGATIVO - Retirar valor 0', () => {
      cy.log(globalThis.qrcode)
      const valorSaque = 0

      request.getLimiteSaque()
      request.postCriarSaqueIgual0(valorSaque)

      assertion.limiteSaque(200)
      assertion.criarSaqueIgual0(400, valorSaque)
    })

    it('NEGATIVO - Retirar valor vazio', () => {
      cy.log(globalThis.qrcode)
      const valorSaque = ""

      request.getLimiteSaque()
      request.postCriarSaqueVazio(valorSaque)

      assertion.limiteSaque(200)
      assertion.criarSaqueVazio(400, valorSaque)
  })
 })
})