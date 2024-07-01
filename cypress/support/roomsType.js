Cypress.Commands.add('daySelect',()=>{          // select random days and summit
    const dates = []
    const rdmDay = Cypress._.random(1,27)
    const rdmDayFormat = rdmDay.toString().padStart(2, "0")
    const rdmMouth = Cypress._.random(1,12)
    const rdmMouthFormat = rdmMouth.toString().padStart(2, "0")
    const rdmYear = Cypress._.random(2000,2002).toString()
    const date1 = `${rdmYear}-${rdmMouthFormat}-${rdmDayFormat}`
    dates.push(date1)
    const rdmMouth2 = Cypress._.random(rdmMouth,12).toString().padStart(2, "0")
    const rdmDay2 = Cypress._.random(rdmDay,28).toString().padStart(2, "0")
    const rdmYear2= Cypress._.random(rdmYear,2022).toString()
    const date2 = `${rdmYear}-${rdmMouthFormat}-${rdmDay2}`        //modify to determine range
    dates.push(date2)
    cy.fixture("roomsType").then((the)=>{       
        cy.get(the.startDate).type(date1)
        cy.get(the.endDate).type(date2)
        cy.get(the.submitBtn).click()
    })
    return cy.wrap(dates)
})
Cypress.Commands.add('selectRoomType', () => {
    return cy.fixture("roomsType").then((the) => {
        return cy.get(the.nextStep).its("length").then((index) => {
            const rdmIndex = Cypress._.random(index - 1)
            return cy.get(the.nextStep).eq(rdmIndex).parents("tr").find(".text-center").eq(2).invoke("text").then((price) => {
                cy.get(the.nextStep).eq(rdmIndex).click()
                return cy.wrap(price)
            })
        })
    })
})

Cypress.Commands.add('selectDateAvailable',()=>{
    function checkDateAvailable() {    
        cy.daySelect().then(()=>{
            cy.get("tbody").then((tbody)=>{
                const dateAvailable = tbody.find(".text-success").length > 0
                if (!dateAvailable) {
                    cy.log("select new date")
                    checkDateAvailable()
                } else{
                    cy.selectRoomType()
                    cy.log("Available dates found")
                }
                
            })
        })
    }
    checkDateAvailable()
})
Cypress.Commands.add('calculateDays', (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  });