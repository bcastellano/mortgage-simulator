<template>
  <div id="amortization-table">
    <h3 class="title is-4">Cuadro de amortización:</h3>

    <b-table
      :data="tableData"
      :striped="true"
      :narrowed="true"
      :hoverable="true">

      <template slot-scope="props">
        <b-table-column field="index" label="index" numeric>
          {{ props.row.index }}
        </b-table-column>
        <b-table-column field="year" label="Año" numeric>
          {{ props.row.year }}
        </b-table-column>
        <b-table-column field="month" label="Mes" numeric>
          {{ props.row.month }}
        </b-table-column>
        <b-table-column field="fee" label="Cuota" numeric>
          {{ props.row.fee.toFixed(2) }}
        </b-table-column>
        <b-table-column field="interest" label="Interés" numeric>
          {{ props.row.interest.toFixed(2) }}
        </b-table-column>
        <b-table-column field="amortizedAmount" label="Capital amortizado" numeric>
          {{ props.row.amortizedAmount.toFixed(2) }}
        </b-table-column>
        <b-table-column field="pendingAmortizedAmount" label="Capital pendiente" numeric>
          {{ props.row.pendingAmortizedAmount.toFixed(2) }}
        </b-table-column>
        <b-table-column field="pendingFee" label="Cuotas pendientes" numeric>
          {{ props.row.pendingFee }}
        </b-table-column>
        <b-table-column field="partialAmortizationAmount" label="Amortización parcial" numeric>
          <span v-if="props.row.partialAmortizationAmount">{{ props.row.partialAmortizationAmount }} - {{ props.row.partialAmortizationType }}</span>
        </b-table-column>
      </template>

      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="currency-eur"
                size="is-large">
              </b-icon>
            </p>
            <p>Nothing here.</p>
          </div>
         </section>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
