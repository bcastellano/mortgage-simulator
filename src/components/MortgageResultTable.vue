<template>
  <div id="result-table">
    <div class="box">
      <h3 class="title is-4">Resultados:</h3>
      <p>Interés mensual: <b>{{resultInitial.monthlyRate.toFixed(6)}}</b></p>
      <p>Cuota inicial: <b>{{resultInitial.monthlyFee.toFixed(2)}}</b></p>
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
            <td>{{resultInitial.totalFees}}</td>
            <td>{{resultFinal.totalFees}}</td>
            <td>{{resultInitial.totalFees - resultFinal.totalFees}}</td>
          </tr>
          <tr>
            <th>Total a pagar:</th>
            <td>{{resultInitial.totalAmount.toFixed(2)}}</td>
            <td>{{resultFinal.totalAmount.toFixed(2)}}</td>
            <td>{{Math.abs(resultInitial.totalAmount - resultFinal.totalAmount).toFixed(2)}}</td>
          </tr>
          <tr>
            <th>Intereses:</th>
            <td>{{resultInitial.interestAmount.toFixed(2)}}</td>
            <td>{{resultFinal.interestAmount.toFixed(2)}}</td>
            <td>{{Math.abs(resultInitial.interestAmount - resultFinal.interestAmount).toFixed(2)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resultInitial: {
      type: Object,
      required: true
    },
    resultFinal: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
