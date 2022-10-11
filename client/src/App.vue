<template>
  <div id="app">
    <div class="header">
      <h1>ecoshop</h1>
    </div>
    <div v-if="isLoggedIn">
      <b-navbar type="navbar" class="navigation">
        <router-link class= "nav-link" to="/" @click="location.reload()">Home </router-link>
        <div v-if="customer.email === 'admin@gmail.com'">
        <router-link class= "nav-link" to="/admin" @click="location.reload()">Admin </router-link>
      </div>
      <div v-if="customer.email != 'admin@gmail.com'">
        <router-link class= "nav-link" to="/catalogue" @click="location.reload()">Catalogue </router-link>
        </div>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="nav-link" to="/profile" @click="location.reload()">Profile</b-nav-item>
          <b-nav-item class="nav-link" @click="logout">Logout</b-nav-item>
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
  background-color: antiquewhite;
}
.nav-link{
  color: #888888;
}
.router-link-exact-active{
  color: #000 !important;
}
.navigation{
  background-color: rgb(255, 232, 201);
  margin-top: -10px;
  color: #888888;
}
.ml-auto{
  color: #888888;
  float: right;
}

.profile{
  margin-top: 20px !important;
}
@media (min-device-width: 200px) and (max-device-height: 500px) {
  .navbar {
    position: sticky-bottom;
    width: 100%;
    max-width: 360px;
    padding : 0;
  }
  .ml-auto {
    margin-right: 0;
    width: 100%;
    max-width: 360px;
    padding : 0;
  }
  .header{
    position: sticky-bottom;
    width: 100%;
    max-width: 360px;
    padding : 0;
  }
  .app{
    position: sticky-bottom;
    width: 100%;
    max-width: 360px;
    padding : 0;
  }
}

</style>
