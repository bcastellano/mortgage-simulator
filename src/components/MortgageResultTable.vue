<template>
  <div>
    <div class="box">
      <h3 class="title is-4">Resultados iniciales:</h3>
      <p>Interés mensual: <b>{{result.initial.monthlyRate}}</b></p>
      <p>Cuota: <b>{{result.initial.monthlyFee}}</b></p>
      <p>Numero de Cuotas: <b>{{result.initial.totalFees}}</b></p>
      <p>Total a pagar: <b>{{result.initial.totalAmount}}</b></p>
      <p>Intereses: <b>{{result.initial.interestAmount}}</b></p>
    </div>
    <div class="box">
      <h3 class="title is-4">Resultados finales:</h3>
      <p>Numero de Cuotas: <b>{{result.final.totalFees}}</b></p>
      <p>Total a pagar: <b>{{result.final.totalAmount}}</b></p>
      <p>Intereses: <b>{{result.final.interestAmount}}</b></p>
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
