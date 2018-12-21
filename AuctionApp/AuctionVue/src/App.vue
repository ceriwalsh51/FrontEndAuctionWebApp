<template>
  <div id="app">
    <b-navbar toggleable="md" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <img src="./assets/gavel.png" class="img-circle" style="padding: 5px">
      <b-navbar-brand to="/">Auctions Web App</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/#"><i class="fa fa-home" style="padding: 5px"> Home</i></b-nav-item>
          <b-nav-item to="/auctions"><i class="fa fa-list" style="padding: 5px"> Manage Auctions</i></b-nav-item>
          <b-nav-item to="/auction"><i class="fa fa-money" style="padding: 5px"> Add Auction</i></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
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
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  background: url("./assets/auctionsBackround.png");
}
.VueTables__sortable {
    cursor: pointer;
}
</style>
