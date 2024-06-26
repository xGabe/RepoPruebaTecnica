import { faker } from "@faker-js/faker";

describe("Create booking",()=>{
    beforeEach("Go to website",()=>{
        cy.visit("/");
    })
    it("create booking",()=>{
        cy.fixture("home").then((the)=> {
            cy.get(the.newBookingBtn).click()
            cy.url().should("contain", "room_types") //micro assert
        })
        cy.selectDateAvailable()  //Select date available
        cy.url().should("contain", "new") //micro assert
        cy.fixture("createBookingPage").then((the)=>{
        cy.selectGuestCount()
        cy.selectRoom()
       
        const rdmName = faker.person.fullName()             //Imput guest data
        const rdmEmail = faker.internet.exampleEmail()
        const rmdNum = faker.phone.number()
        cy.get(the.guestName).type(rdmName)
        cy.get(the.guestEmail).type(rdmEmail)
        cy.get(the.guestNum).type(rmdNum)
        cy.intercept('POST', '**').as("createBooking")
        // cy.get(the.submitBtn).click()
        cy.wait("@createBooking").then((request)=>{
            const requestData = request.request.body
            cy.log(requestData)
            cy.parseQuery(requestData).then((parsedData) => {
                cy.log('Datos parseados:', parsedData)
                // const start_date = parsedData.start_date
                // const end_date = parsedData.end_date
                const guest_count = parsedData.guest_count
                cy.get("tr").last().should("contain", `${guest_count}`)
            })
        })
    })   

})
})
