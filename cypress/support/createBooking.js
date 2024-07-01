Cypress.Commands.add('reformatDate', (dateStr) => {
    const reformatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year.slice(-2)}`;
    };
    return cy.wrap(reformatDate(dateStr));
});

Cypress.Commands.add('selectGuestCount',()=>{
    cy.fixture("createBookingPage").then((the)=>{
        cy.get(the.guestCount).then((input) =>{         //Select guest count
            const max = input.attr("max")
            const min = input.attr("min")
            const rdmInput = Cypress._.random(min, max)
            cy.get(the.guestCount).type(rdmInput)
        })
    })
})
Cypress.Commands.add('selectRoom',()=>{
    cy.fixture("createBookingPage").then((the)=>{
        cy.get(the.roomInput).children().its("length").then((index)=>{
        const rdmIndex = Cypress._.random(index -1)
        cy.get(the.roomInput).select(rdmIndex)
        })
    })
})
Cypress.Commands.add('validateError',(element,errorMsg)=>{
    cy.get(element).then((input) => {
        // Verify invalid field
        expect(input[0].validity.valid).to.be.false;                        
        // Verify error message
        const validationMessage = input[0].validationMessage;
        expect(validationMessage).to.include(errorMsg);
    }) 
})
Cypress.Commands.add('inputName',(name)=>{
    cy.fixture("createBookingPage").then((the)=>{
        cy.get(the.guestName).type(name)
    })
})
Cypress.Commands.add('inputEmail',(email)=>{
    cy.fixture("createBookingPage").then((the)=>{
        cy.get(the.guestEmail).type(email)
    })
})
Cypress.Commands.add('inputNum',(num)=>{
    cy.fixture("createBookingPage").then((the)=>{
        cy.get(the.guestNum).type(num)
    })
})
Cypress.Commands.add('submitForm',()=>{
    cy.fixture("createBookingPage").then((the)=>{
        cy.get(the.submitBtn).click()
    })
})
