
let mortgageData = {
  capital: 0,
  installments: 0,
  mortgageType: 0,
  differential: 0,
  euribor: 0,
  fixedRate: 0,
  partialAmortization: [],
  startDate: null
}

try {
  if (localStorage.mortgageData) {
    mortgageData = JSON.parse(localStorage.mortgageData)
    mortgageData.startDate = new Date(mortgageData.startDate)
  }
} catch (error) {
  console.error('Data in localstorage corrupted')
}

export default {
  get () {
    return mortgageData
  },
  save () {
    localStorage.mortgageData = JSON.stringify(mortgageData)
  }
}
