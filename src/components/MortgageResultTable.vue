<template>
  <div id="result-table">
    <div class="box">
      <h3 class="title is-4">Resultados:</h3>
      <p>Interés mensual: <b>{{result.initial.monthlyRate.toFixed(6)}}</b></p>
      <p>Cuota inicial: <b>{{result.initial.monthlyFee.toFixed(2)}}</b></p>
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>R.inicial</th>
            <th>R.final</th>
            <th>diff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Numero de Cuotas:</th>
            <td>{{result.initial.totalFees}}</td>
            <td>{{result.final.totalFees}}</td>
            <td>{{result.initial.totalFees - result.final.totalFees}}</td>
          </tr>
          <tr>
            <th>Total a pagar:</th>
            <td>{{result.initial.totalAmount.toFixed(2)}}</td>
            <td>{{result.final.totalAmount.toFixed(2)}}</td>
            <td>{{Math.abs(result.initial.totalAmount - result.final.totalAmount).toFixed(2)}}</td>
          </tr>
          <tr>
            <th>Intereses:</th>
            <td>{{result.initial.interestAmount.toFixed(2)}}</td>
            <td>{{result.final.interestAmount.toFixed(2)}}</td>
            <td>{{Math.abs(result.initial.interestAmount - result.final.interestAmount).toFixed(2)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
