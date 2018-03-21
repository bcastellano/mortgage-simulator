<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-two-thirds">
        <mortgage-form :m-data="mortgageData"></mortgage-form>
      </div>
      <div class="column">
        <mortgage-result-table :result="result"></mortgage-result-table>
      </div>
    </div>

    <mortgage-amortization-table :table-data="tableData"></mortgage-amortization-table>

  </div>
</template>

<script>
import MortgageForm from './MortgageForm.vue'
import MortgageResultTable from './MortgageResultTable.vue'
import MortgageAmortizationTable from './MortgageAmortizationTable.vue'
import Mortgage from '../lib/mortgage'

/*
 mortgage type: 1 - Variable; 2 - Fijo
 partial amortization type: 1 - Cuota; 2 - Plazo
 */

// Initial model
var mortgageData = Mortgage.get()

// result data
var result = {
  initial: {},
  final: {}
}

// amortization data
var tableData = []

export default {
  name: 'Dashboard',
  components: {
    MortgageForm,
    MortgageResultTable,
    MortgageAmortizationTable
  },
  data () {
    return {
      mortgageData,
      result,
      tableData
    }
  },
  watch: {
    mortgageData: {
      handler: function (newMortgageData, oldMortgageData) {
        this.calculateInterest()
        this.calculateTable()

        Mortgage.save()
      },
      deep: true
    }
  },
  methods: {
    PMT (rate, nper, pv, fv, type) {
      if (!fv) fv = 0
      if (!type) type = 0

      if (rate === 0) return -(pv + fv) / nper

      let pvif = Math.pow(1 + rate, nper)
      let pmt = rate / (pvif - 1) * -(pv * pvif + fv)

      if (type === 1) {
        pmt /= (1 + rate)
      }

      return pmt
    },
    NPER (rate, pmt, pv, fv) {
      if (fv === undefined) {
        fv = 0
      }

      if (rate === 0) {
        return -(fv + pv) / pmt
      }

      return Math.log((-fv * rate + pmt) / (pmt + rate * pv)) / Math.log(1 + rate)
    },
    calculateInterest () {
      let monthlyRate = (mortgageData.mortgageType === '1' ? (mortgageData.differential + mortgageData.euribor) / (12 * 100) : mortgageData.fixedRate / (12 * 100))
      let totalFees = mortgageData.installments * 12
      let monthlyFee = this.PMT(monthlyRate, totalFees, -mortgageData.capital)
      let totalAmount = totalFees * monthlyFee
      let interestAmount = totalAmount - mortgageData.capital

      result.initial = {
        monthlyRate: monthlyRate,
        monthlyFee: monthlyFee,
        totalFees: totalFees,
        totalAmount: totalAmount,
        interestAmount: interestAmount
      }
    },
    calculateTable () {
      tableData.splice(0, tableData.length)
      let pendingCapital = mortgageData.capital
      let finalTotalAmount = 0
      let finalInterestAmount = 0
      let lastFee = 0
      let partialAmortization = {}
      for (let it of mortgageData.partialAmortization) {
        partialAmortization[it.fee] = it
      }
      let month = 1
      for (let index = 0; index < result.initial.totalFees; index++) {
        const item = {}

        item.index = index
        item.month = month
        item.partialAmortizationAmount = 0
        if (partialAmortization[item.month]) {
          item.partialAmortizationAmount = partialAmortization[item.month].amount
          item.partialAmortizationType = partialAmortization[item.month].type
        }
        item.year = Math.ceil(item.month / 12)
        item.pendingFee = result.initial.totalFees - item.index - 1

        // if amortization of period
        if (partialAmortization[item.month] && partialAmortization[item.month].type === '2') {
          item.fee = lastFee
          item.interest = pendingCapital * result.initial.monthlyRate
          item.amortizedAmount = item.fee - item.interest + item.partialAmortizationAmount
          pendingCapital -= item.amortizedAmount
          item.pendingAmortizedAmount = pendingCapital

          const remainFees = Math.floor(this.NPER(result.initial.monthlyRate, -lastFee, pendingCapital)) + 1
          index += (item.pendingFee - remainFees)

          item.pendingFee = remainFees
        } else {
          item.fee = this.PMT(result.initial.monthlyRate, item.pendingFee + 1, -pendingCapital)
          item.interest = pendingCapital * result.initial.monthlyRate
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

      result.final = {
        totalFees: tableData.length,
        totalAmount: finalTotalAmount,
        interestAmount: finalInterestAmount
      }
    }
  },
  created: function () {
    this.calculateInterest()
    this.calculateTable()
  }
}
</script>

<style scoped>

</style>
