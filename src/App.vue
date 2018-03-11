<template>
  <div id="app">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Simulador de hipotecas
          </h1>
          <h2 class="subtitle">
            Calcula como quedarán los intereses y cuadro de amortización de tu hipoteca
          </h2>
        </div>
      </div>

      <div class="hero-foot">
        <div class="container">
          <nav class="tabs is-boxed">
            <ul>
              <router-link tag="li" to="/" exact-active-class="is-active">
                <a>dashboard</a>
              </router-link>
              <router-link tag="li" to="/doc" exact-active-class="is-active">
                <a>documentation</a>
              </router-link>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <div class="section">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
