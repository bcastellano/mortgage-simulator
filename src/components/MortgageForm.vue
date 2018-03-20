<template>
  <div id="form" class="box">
    <h3 class="title is-4">Form</h3>
    <section>
        <div class="columns">
          <div class="column">
            <b-field label="Capital">
                <b-input placeholder="Capital del préstamo"
                    icon="cash-multiple"
                    v-model.number="mData.capital"
                    required
                    type="number"
                    id="capital">
                </b-input>
            </b-field>
            <b-field label="Plazos">
                <b-input placeholder="Introduzce el número de años"
                    icon="calendar-range"
                    v-model.number="mData.installments"
                    required
                    type="number"
                    id="installments">
                </b-input>
            </b-field>
          </div>
          <div class="column">
            <b-field label="Tipo">
                <b-select v-model="mData.mortgageType"
                    id="mortgageType">
                  <option disabled value="">Selecciona tipo de hipoteca</option>
                  <option value="1">Variable</option>
                  <option value="2">Fijo</option>
                </b-select>
            </b-field>
            <div v-if="mData.mortgageType == 1">
              <b-field label="Diferencial">
                <b-input placeholder="Introduce el diferencial aplicado"
                    icon="percent"
                    v-model.number="mData.differential"
                    required
                    id="differential">
                </b-input>
              </b-field>
              <b-field label="Euribor">
                <b-input placeholder="Introduce el euribor aplicado"
                    icon="percent"
                    v-model.number="mData.euribor"
                    required
                    id="euribor">
                </b-input>
              </b-field>
            </div>
            <div v-if="mData.mortgageType == 2">
              <b-field label="Tipo interés">
                <b-input placeholder="Introduce el tipo de interés"
                    icon="percent"
                    v-model.number="mData.fixedRate"
                    required
                    id="fixedRate">
                </b-input>
              </b-field>
            </div>
          </div>
          <div class="column">
            <button v-on:click="addPartialAmortization()" id="partialAmortizationAdd">add</button>
            <b-field>
              <b-input placeholder="fee"
                  v-model.number="fee"
                  required
                  id="partialAmortizationFee">
              </b-input>
            </b-field>
            <b-field>
              <b-input placeholder="amount"
                  v-model.number="amount"
                  required
                  id="partialAmortizationAmount">
              </b-input>
            </b-field>
            <b-field>
              <b-input placeholder="type"
                  v-model="type"
                  required
                  id="partialAmortizationType">
              </b-input>
            </b-field>
            <b-table
              :data="mData.partialAmortization"
              :striped="true"
              :narrowed="true"
              :hoverable="true">

              <template slot-scope="props">
                <b-table-column field="fee" label="Cuota" numeric>
                  {{ props.row.fee }}
                </b-table-column>
                <b-table-column field="amount" label="Cantidad amortizada" numeric>
                  {{ props.row.amount.toFixed(2) }}
                </b-table-column>
                <b-table-column field="type" label="Tipo" numeric>
                  {{ props.row.type }}
                </b-table-column>
                <b-table-column label="acciones">
                  <a v-on:click="removePartialAmortization(props.index)">eliminar</a>
                </b-table-column>
              </template>

              <template slot="empty">
                <section class="section">
                  <div class="content has-text-grey has-text-centered">
                    <p>
                      <b-icon
                        icon="currency-eur"
                        size="is-small">
                      </b-icon>
                    </p>
                    <p>Nothing here.</p>
                  </div>
                </section>
              </template>
            </b-table>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
let fee = 0
let amount = 0
let type = '2'

export default {
  props: {
    mData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      fee,
      amount,
      type
    }
  },
  methods: {
    removePartialAmortization (i) {
      this.mData.partialAmortization.splice(i, 1)
    },
    addPartialAmortization () {
      this.mData.partialAmortization.push({
        fee: this.fee,
        amount: this.amount,
        type: this.type
      })
    }
  }
}
</script>

<style scoped>
</style>
