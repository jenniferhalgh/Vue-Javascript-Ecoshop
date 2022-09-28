<template>
    <div>
      <getDropdownCart/>
<h1>Profile:</h1>
<display/>
<router-link class="links" to="/editProfile">
<button class="link; button" to="/editProfile">Edit Profile</button>
</router-link>
<button class="link; button" variant="primary" v-on:click="deleteCustomer()">Delete Account</button>
<get-order/>
</div>
</template>

<script>
// @ is an alias to /src
import Display from '../components/display.vue'
import GetOrder from '../components/getOrder.vue'
import getDropdownCart from '../components/getDropdownCart.vue'
import { Api } from '@/Api'

export default {
  name: 'profile',
  components: { Display, GetOrder, getDropdownCart },
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
      return response.json()
    }).then((responseData) => {
      this.customer = responseData
    }).catch(function (err) {
      console.log(err)
    })
  },
  created() {
    if (sessionStorage.getItem('token') == null) {
      this.$bvModal.msgBoxOk('Unauthorized: Please log in')
      this.$router.push('/login')
    }
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

<style scoped>
img {
border-radius: 50%;
display: block;
margin-left: auto;
margin-right: auto;
width:150px;
height:150px;
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
