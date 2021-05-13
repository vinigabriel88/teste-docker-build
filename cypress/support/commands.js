Cypress.Commands.add('makeBodyRequest', (Url, Method, Headers, Body) => {
  cy.request({
    url: Url,
    method: Method,
    headers: Headers,
    body: Body,
    failOnStatusCode: false,
  })
    .its('.')
    .should('not.be.empty')
    .then((res) => res)
})

Cypress.Commands.add('makeQueryStringRequest', (Url, Qs, Method, Headers) => {
  cy.request({
    url: Url,
    qs: Qs,
    method: Method,
    headers: Headers,
    failOnStatusCode: false,
  })
    .its('.')
    .should('not.be.empty')
    .then((res) => res)
})

Cypress.Commands.add('makeTemplateRequest', (Url, Method, Headers) => {
  cy.request({
    url: Url,
    method: Method,
    headers: Headers,
    failOnStatusCode: false,
  })
    .its('.')
    .should('not.be.empty')
    .then((res) => res)
})
