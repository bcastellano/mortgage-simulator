<template>
  <div class="container is-fluid">
    <div class="columns">
      <div class="column is-two-thirds">
        <mortgage-form :m-data="mortgageData"></mortgage-form>
      </div>
      <div class="column">
        <mortgage-result-table :result-initial="calculatedData.result.initial" :result-final="calculatedData.result.final"></mortgage-result-table>
      </div>
    </div>

    <mortgage-amortization-table :table-data="calculatedData.table"></mortgage-amortization-table>

  </div>
</template>

<script>
import MortgageForm from './MortgageForm.vue'
import MortgageResultTable from './MortgageResultTable.vue'
import MortgageAmortizationTable from './MortgageAmortizationTable.vue'
import Mortgage from '../lib/mortgage'
import modelData from '../lib/modelData'

export default {
  name: 'Dashboard',
  components: {
    MortgageForm,
    MortgageResultTable,
    MortgageAmortizationTable
  },
  data () {
    return {
      mortgageData: modelData.get()
    }
  },
  computed: {
    calculatedData: function () {
      return Mortgage(this.mortgageData)
    }
  },
  watch: {
    mortgageData: {
      handler: function (newMortgageData, oldMortgageData) {
        modelData.save()
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
