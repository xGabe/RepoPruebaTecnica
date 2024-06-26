Cypress.Commands.add('parseQuery', (requestData) => {
    function parseQueryString(queryString) {
      return queryString.split('&').reduce((acc, pair) => {
        const [key, value] = pair.split('=');
        acc[decodeURIComponent(key)] = decodeURIComponent(value);
        return acc;
      }, {});
    }
    const parsedData = parseQueryString(requestData);  
    return parsedData;
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