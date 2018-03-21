/*
 mortgage type: 1 - Variable; 2 - Fijo
 partial amortization type: 1 - Cuota; 2 - Plazo
 */

function PMT (rate, nper, pv, fv, type) {
  if (!fv) fv = 0
  if (!type) type = 0

  if (rate === 0) return -(pv + fv) / nper

  let pvif = Math.pow(1 + rate, nper)
  let pmt = rate / (pvif - 1) * -(pv * pvif + fv)

  if (type === 1) {
    pmt /= (1 + rate)
  }

  return pmt
}

function NPER (rate, pmt, pv, fv) {
  if (fv === undefined) {
    fv = 0
  }

  if (rate === 0) {
    return -(fv + pv) / pmt
  }

  return Math.log((-fv * rate + pmt) / (pmt + rate * pv)) / Math.log(1 + rate)
}

function calculate (mortgageData) {
  let monthlyRate = (mortgageData.mortgageType === '1' ? (mortgageData.differential + mortgageData.euribor) / (12 * 100) : mortgageData.fixedRate / (12 * 100))
  let totalFees = mortgageData.installments * 12
  let monthlyFee = PMT(monthlyRate, totalFees, -mortgageData.capital)
  let totalAmount = totalFees * monthlyFee
  let interestAmount = totalAmount - mortgageData.capital

  let tableData = []
  let pendingCapital = mortgageData.capital
  let finalTotalAmount = 0
  let finalInterestAmount = 0
  let lastFee = 0
  let partialAmortization = {}
  for (let it of mortgageData.partialAmortization) {
    partialAmortization[it.fee] = it
  }
  let month = 1
  for (let index = 0; index < totalFees; index++) {
    const item = {}

    item.index = index
    item.month = month
    item.partialAmortizationAmount = 0
    if (partialAmortization[item.month]) {
      item.partialAmortizationAmount = partialAmortization[item.month].amount
      item.partialAmortizationType = partialAmortization[item.month].type
    }
    item.year = Math.ceil(item.month / 12)
    item.pendingFee = totalFees - item.index - 1

    // if amortization of period
    if (partialAmortization[item.month] && partialAmortization[item.month].type === '2') {
      item.fee = lastFee
      item.interest = pendingCapital * monthlyRate
      item.amortizedAmount = item.fee - item.interest + item.partialAmortizationAmount
      pendingCapital -= item.amortizedAmount
      item.pendingAmortizedAmount = pendingCapital

      const remainFees = Math.floor(NPER(monthlyRate, -lastFee, pendingCapital)) + 1
      index += (item.pendingFee - remainFees)

      item.pendingFee = remainFees
    } else {
      item.fee = PMT(monthlyRate, item.pendingFee + 1, -pendingCapital)
      item.interest = pendingCapital * monthlyRate
      item.amortizedAmount = item.fee - item.interest + item.partialAmortizationAmount
      pendingCapital -= item.amortizedAmount
      item.pendingAmortizedAmount = pendingCapital
    }

    finalTotalAmount += (item.fee + item.partialAmortizationAmount)
    finalInterestAmount += item.interest

    tableData.push(item)
    lastFee = item.fee
    month++
  }

  return {
    result: {
      initial: {
        monthlyRate: monthlyRate,
        monthlyFee: monthlyFee,
        totalFees: totalFees,
        totalAmount: totalAmount,
        interestAmount: interestAmount
      },
      final: {
        totalFees: tableData.length,
        totalAmount: finalTotalAmount,
        interestAmount: finalInterestAmount
      }
    },
    table: tableData
  }
}

function calculateResult (mortgageData) {
  var {result, table} = calculate(mortgageData)

  return {
    result: result,
    table: table
  }
}

export default calculateResult
