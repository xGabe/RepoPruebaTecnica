Cypress.Commands.add('daySelect',()=>{          // select random days and summit
    const dates = []
    const rdmDay = Cypress._.random(1,28)
    const rdmDayFormat = rdmDay.toString().padStart(2, "0")
    const rdmMouth = Cypress._.random(1,11)
    const rdmMouthFormat = rdmMouth.toString().padStart(2, "0")
    const rdmYear = Cypress._.random(2017,2022).toString()
    const date1 = `${rdmYear}-${rdmMouthFormat}-${rdmDayFormat}`
    dates.push(date1)
    const rdmMouth2 = Cypress._.random(rdmMouth +1 ,12).toString().padStart(2, "0")
    const rdmDay2 = Cypress._.random(1,28).toString().padStart(2, "0")
    const rdmYear2= Cypress._.random(rdmYear,2024).toString()
    const date2 = `${rdmYear2}-${rdmMouth2}-${rdmDay2}`
    dates.push(date2)
    cy.get("[name='start_date']").click().type(date1)  //Select dates
    cy.get("[name='end_date']").click().type(date2)
    cy.get(".btn.btn-primary").click()
    return cy.wrap(dates)
})

Cypress.Commands.add('selectDateAvailable',()=>{
    function checkDateAvailable() {    
        cy.daySelect().then(()=>{
            cy.get("body").then((body)=>{
                const dateAvailable = body.find(".text-success").length > 0
                if (!dateAvailable) {
                    cy.log("select new date")
                    checkDateAvailable()
                } else{
                    cy.fixture("roomsType").then((the) =>{
                        cy.get(the.nextStep).its("length").then((index)=>{
                            const rdmIndex = Cypress._.random(index-1)
                            cy.get(the.nextStep).eq(rdmIndex).click()
                            cy.log("Available dates found")
                            
                        })
                    })
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