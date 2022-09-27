<template>
    <div>
      <getDropdownCart/>
<h1>Profile</h1>
<img src="@/assets/whiteshirt.jpeg" alt="Profile pic">
<button class="button button">Edit Profile</button>
<display/>
<get-order/>
</div>
</template>
<script>
import Display from '../components/display.vue'
import GetOrder from '../components/getOrder.vue'
import getDropdownCart from '../components/getDropdownCart.vue'
// @ is an alias to /src

export default {
  name: 'profile',
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
  components: { Display, GetOrder, getDropdownCart },
  data() {
    return {
      customer: {}
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
