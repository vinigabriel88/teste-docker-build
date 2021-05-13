class AssertionsAuthorization {

    limiteSaque(status){
        cy.get('@limiteSaque').then((response) => {
            expect(response.status).to.eq(status)
            expect(response.body.available_withdrawal_value).to.be.not.null
        })
    }

    criarSaque(status, value){
        cy.get('@criarSaque').then((response) => {
            expect(response.status).to.eq(status)
            expect(response.body.withdrawal_value).to.eq(value)
            expect(response.body.withdrawal_value).to.be.not.null
            expect(response.body.withdrawal_value).to.be.lessThan(globalThis.limiteSaque)
        })
    }

    criarSaqueMaiorQueSaldoDia(status, value){
        cy.get('@criarSaqueMaiorQueSaldoDia').then((response) => {
            expect(response.status).to.eq(status)
            expect(response.body.message).to.eq("O limite de saques diários por conta é de R$ 1,000.00. Hoje você pode sacar até R$ 1,000.00.")
            expect(response.body.short_message).to.eq("Limite de saques atingido")
        })
    }

    criarSaqueMenorQue20(status, value){
        cy.get('@criarSaqueMenorQue20').then((response) => {
            expect(response.status).to.eq(status)
            expect(response.body.message).to.eq("O valor mínimo para realizar o saque é de R$ 20.00. Insira outro valor e tente novamente.")
            expect(response.body.short_message).to.eq("Escolha outro valor")
        })
    }
    criarSaqueIgual0(status, value){
        cy.get('@criarSaqueIgual0').then((response) => {
            expect(response.status).to.eq(status)
            expect(response.body.errors[0].message).to.eq("Valor mínimo permitido 1")
            expect(response.body.errors[0].code).to.eq("invalid")
        })
    }

    criarSaqueVazio(status, value){
        cy.get('@criarSaqueVazio').then((response) => {
            expect(response.status).to.eq(status)
            expect(response.body.errors[0].message).to.eq("Valor do saque não informado")
            expect(response.body.errors[0].code).to.eq("invalid")
        })
    }
}
export default new AssertionsAuthorization () 