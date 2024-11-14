const { faker } = require("@faker-js/faker")
const { selectors, sendForm } = require("../../support/selectors")
let randomNumberForLenguage = faker.datatype.number({ min: 0, max: 4 });
let randomNumberForCheckboxs = faker.datatype.number({ min: 0, max: 5 });
let randomNumberForRating = faker.datatype.number({ min: 0, max: 4 });
let randomNumberForFirstRadioBtn = faker.datatype.number({ min: 0, max: 3 });
let randomNumberForSecondRadioBtn = faker.datatype.number({ min: 0, max: 3 });
let name = faker.person.firstName()
let lastName = faker.person.lastName()
let emaiil = faker.internet.exampleEmail()
let brithday = "1996-02-08"

describe("Send Forms",()=>{
    beforeEach("Go to Form",()=>{
        cy.visit("/viewform")
    })
    it("TC1: validate sending the form correctly completed",()=>{
        cy.get(selectors.inputName).type(name)
        cy.get(selectors.inputLastName).type(lastName)
        cy.get(selectors.inputEmail).type(emaiil)
        cy.get(selectors.datePicker).click().type(brithday)
        cy.get(selectors.language).click()
        cy.get(selectors.lenguageOptions[randomNumberForLenguage]).click()
        cy.wait(100)
        cy.get(selectors.checkboxOptions[randomNumberForCheckboxs]).click()
        cy.get(selectors.rating[randomNumberForRating]).click()
        cy.get(selectors.firstRadioButton[randomNumberForFirstRadioBtn]).click()
        cy.get(selectors.secondRadioButton[randomNumberForSecondRadioBtn]).click()
        cy.get(selectors.submitForm).click()
        cy.wait("@sendedForm").its('response.statusCode').should('eq', 204);
    })
    it("TC2: validate send the form only the required fields",()=>{
        cy.get(selectors.inputName).type(name)
        cy.get(selectors.inputLastName).type(lastName)
        cy.get(selectors.inputEmail).type(emaiil)
        cy.get(selectors.datePicker).click().type(brithday)
        cy.get(selectors.language).click()
        cy.get(selectors.lenguageOptions[randomNumberForLenguage]).click()
        cy.wait(100)
        cy.get(selectors.submitForm).click()
        cy.wait("@sendedForm").its('response.statusCode').should('eq', 204)
    })
    it("TC3: Send Form by functions",()=>{
        sendForm(name, lastName, emaiil, brithday, randomNumberForLenguage, randomNumberForCheckboxs, randomNumberForRating, randomNumberForFirstRadioBtn, randomNumberForSecondRadioBtn)
        cy.wait("@sendedForm").its('response.statusCode').should('eq', 204)
    })
}) 