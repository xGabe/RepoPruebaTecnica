const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      // implement node event listeners here
    
    baseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-K-EdIVtFdhM-CoGB5XIJ7hy7DAc14V2SXzEig1HkzyeJgQ"
  },
});
