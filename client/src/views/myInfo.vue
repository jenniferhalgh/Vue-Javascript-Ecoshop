<template>
  <div class="container-fluid">
  <div class="row">
    <div>
      <profileNav/>
    </div>
            <div class="col ml-5 text">
          <div style="text-align:center">
            <h3> {{customer.name.firstname}} {{customer.name.lastname}}</h3>
            <router-link class="links" to="/editProfile">
<button class="link; button" to="/editProfile">Edit Profile</button>
<button class="link; button" variant="primary" v-on:click="deleteCustomer()">Delete Account</button>
</router-link>
          </div>
          <div class="green-text">
            <p>{{ customer.email }}</p>
          </div>
          </div>

  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import profileNav from '../components/profileNav.vue'

export default {
  name: 'myInfo',
  components: { profileNav },
  mounted() {
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
      if (response.status === 401) {
        this.$bvModal.msgBoxOk('Unauthorized. Please log in again')
        sessionStorage.setItem('token', null)
        this.$router.push('/signIn')
      } else {
        return response.json()
      }
    }).then((responseData) => {
      this.customer = responseData
    }).catch(function (err) {
      console.log(err)
    })
  },
  data() {
    return {
      customer: {}
    }
  },
  methods: {
    deleteCustomer() {
      if (confirm('Are you certain that you want to delete your account? This action cannot be undone.')) {
        Api.delete(`/customers/${this.customer._id}`)
          .then((res) => {
            sessionStorage.clear()
            console.log(res)
            this.$bvModal.msgBoxOk('Account deleted')
          }).catch((error) => {
            console.log(error)
          })
        this.$router.push('/Login')
      }
    }
  }
}
</script>

<style>
.green-text{
        text-align: center;
        font-weight: 100;
    }

.button {
background-color: #99ae71;
border: none;
color: white;
padding: 20px;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
margin: 4px 2px;
border-radius: 12px;
display: block;
margin-left: auto;
margin-right: auto;
}

</style>
