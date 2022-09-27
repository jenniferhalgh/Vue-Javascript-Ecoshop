<template>
  <div id="app">
    <div class="header">
      <h1>ecoshop</h1>
    </div>
    <div v-if="isLoggedIn">
      <b-navbar type="navbar" class="navigation">
        <router-link class= "links ml-5" to="/">Home </router-link>
        <router-link class= "links ml-5" to="/customers">Customers </router-link>
        <router-link class= "links ml-5" to="/catalogue">Catalogue </router-link>
        <b-navbar-nav class="ml-auto">
          <router-link class="links ml-5" to="/profile"> Profile</router-link>
          <b-nav-item class="links ml-5" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div v-else>
      <router-link class= "links" to="/login"> </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  data() {
    return {
      isLoggedIn: false,
      customer: {}
    }
  },
  mounted() {
    if (sessionStorage.getItem('token') === null) {
      this.isLoggedIn = false
      this.$router.push('/login')
    } else {
      this.isLoggedIn = true
      this.getCustomer()
    }
  },
  methods: {
    logout() {
      sessionStorage.setItem('token', null)
      this.isLoggedIn = false
      this.customer = {}
      sessionStorage.clear()
      this.$router.push('/login')
    },
    getCustomer() {
      Api.get('/customer', {
        headers: { token: sessionStorage.getItem('token') }
      }).then((res) => {
        this.customer = res.data.customer
        console.log(res.data.customer)
      })
    }
  }
}
</script>

<style>
.app {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: left;
  color: #99ae71;
  background-color: antiquewhite;
}
.header{
  text-align: center;
  color: #99ae71;
  font-size: 50px;
  background-color: rgb(251, 230, 203);
}
.links{
  color: #888888;
}
.router-link-exact-active{
  color: #000;
}
.navbar{
  background-color: rgb(255, 232, 201);
  margin-top: -10px;
}
.nav-item{
  color: #888888 !important;
}
</style>
