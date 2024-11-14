export const selectors = {
    inputName: ':nth-child(1) > [jsmodel="CP1oW"] > .geS5n > .AgroKb > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd',
    inputLastName: ':nth-child(2) > [jsmodel="CP1oW"] > .geS5n > .AgroKb > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd',
    inputEmail: ':nth-child(3) > [jsmodel="CP1oW"] > .geS5n > .AgroKb > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd',
    datePicker: '.o7cIKf > .rFrNMe > .aCsJod > .aXBtI > .Xb9hP > .whsOnd',
    language: '.KKjvXb',
    lenguageOptions: {
        '0': '.OA0qNb > [data-value="Español"]',
        '1': '.OA0qNb > [data-value="English"]',
        '2': '.OA0qNb > [data-value="Türkçe"]',
        '3': '.OA0qNb > [data-value="Deutsch"]',
        '4': '.OA0qNb > [data-value="Français"]'
    },
    checkboxOptions: {
        '0': ':nth-child(1) > .docssharedWizToggleLabeledContainer',
        '1': ':nth-child(2) > .docssharedWizToggleLabeledContainer',
        '2': ':nth-child(3) > .docssharedWizToggleLabeledContainer',
        '3': ':nth-child(4) > .docssharedWizToggleLabeledContainer',
        '4': ':nth-child(5) > .docssharedWizToggleLabeledContainer',
        '5': ':nth-child(6) > .docssharedWizToggleLabeledContainer'
    },
    rating: {
        '0': '[data-ratingscale="1"] > .tCu6Cd',
        '1': '[data-ratingscale="1"] > .tCu6Cd',
        '2': '[data-ratingscale="1"] > .tCu6Cd',
        '3': '[data-ratingscale="1"] > .tCu6Cd',
        '4': '[data-ratingscale="1"] > .tCu6Cd'
    },
    firstRadioButton: {
        '0': ':nth-child(8) > [jsmodel="CP1oW"] > .geS5n > .PY6Xd > .lLfZXe > .H2Gmcc > .N9Qcwe > :nth-child(2) > .eRqjfd',
        '1': ':nth-child(8) > [jsmodel="CP1oW"] > .geS5n > .PY6Xd > .lLfZXe > .H2Gmcc > .N9Qcwe > :nth-child(3) > .eRqjfd',
        '2': ':nth-child(8) > [jsmodel="CP1oW"] > .geS5n > .PY6Xd > .lLfZXe > .H2Gmcc > .N9Qcwe > :nth-child(4) > .eRqjfd',
        '3': ':nth-child(8) > [jsmodel="CP1oW"] > .geS5n > .PY6Xd > .lLfZXe > .H2Gmcc > .N9Qcwe > :nth-child(5) > .eRqjfd',
    },
    secondRadioButton: {
        '0': ':nth-child(9) > [jsmodel="CP1oW"] > .geS5n > .PY6Xd > .lLfZXe > .H2Gmcc > .N9Qcwe > :nth-child(2) > .eRqjfd',
        '1': ':nth-child(9) > [jsmodel="CP1oW"] > .geS5n > .PY6Xd > .lLfZXe > .H2Gmcc > .N9Qcwe > :nth-child(3) > .eRqjfd',
        '2': ':nth-child(9) > [jsmodel="CP1oW"] > .geS5n > .PY6Xd > .lLfZXe > .H2Gmcc > .N9Qcwe > :nth-child(4) > .eRqjfd',
        '3': ':nth-child(9) > [jsmodel="CP1oW"] > .geS5n > .PY6Xd > .lLfZXe > .H2Gmcc > .N9Qcwe > :nth-child(5) > .eRqjfd',
    },
    submitForm: '.lRwqcd > .uArJ5e > .l4V7wb'
}

export function sendForm(name, lastName, emaiil, brithday, lenguage, checkbox, rating, firstRadioBtn, secondRadioBtn){
    cy.get(selectors.inputName).type(name)
    cy.get(selectors.inputLastName).type(lastName)
    cy.get(selectors.inputEmail).type(emaiil)
    cy.get(selectors.datePicker).click().type(brithday)
    cy.get(selectors.language).click()
    cy.get(selectors.lenguageOptions[lenguage]).click()
    cy.wait(100)
    cy.get(selectors.checkboxOptions[checkbox]).click()
    cy.get(selectors.rating[rating]).click()
    cy.get(selectors.firstRadioButton[firstRadioBtn]).click()
    cy.get(selectors.secondRadioButton[secondRadioBtn]).click()
    cy.get(selectors.submitForm).click()
}