<template>
  <div id="app">
    <div class="header">
      <h1>ecoshop</h1>
    </div>
    <div v-if="isLoggedIn">
      <b-navbar type="navbar" class="navigation">
        <router-link class= "links ml-5 mb-2" to="/" @click="location.reload()">Home </router-link>
        <div v-if="customer.email === 'admin@gmail.com'">
        <router-link class= "links ml-5" to="/admin" @click="location.reload()">Admin Page </router-link>
      </div>
        <router-link class= "links ml-5 mb-2" to="/catalogue" @click="location.reload()">Catalogue </router-link>
        <b-navbar-nav class="ml-auto">
          <router-link class="links ml-5 profile" to="/profile" @click="location.reload()">Profile</router-link>
          <b-nav-item class="links ml-5 mb-2" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div v-else>
      <router-link class= "links" to="/signIn"> </router-link>
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
      customer: {},
      isAdmin: false
    }
  },
  components: { },
  mounted() {
    if (sessionStorage.getItem('token') === null) {
      this.isLoggedIn = false
      this.$router.push('/signIn')
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
      this.$router.push('/signUp')
      location.reload()
    },
    getCustomer() {
      const jwttoken = {
        token: sessionStorage.getItem('token')
      }
      fetch('http://localhost:3000/customer', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Host: '',
          token: jwttoken.token
        }
      }).then((response) => {
        return response.json()
      }).then((responseData) => {
        this.customer = responseData
      }).catch(function (err) {
        console.log(err)
      })
    },
    deleteCustomers() {
      Api.delete('/customers').then((res) => {
        this.$bvModal.msgBoxOk('All Customers Are Deleted')
      },
      (err) => {
        console.log(err.response)
        this.boxOne = ''
        this.error = err.response.data.error
        this.$bvModal.msgBoxOk(this.error)
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

.profile{
  margin-top: 20px !important;
}

</style>
