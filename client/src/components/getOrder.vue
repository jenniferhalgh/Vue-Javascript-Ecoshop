<template>
    <div>
    <h1>Order History</h1>
    <p>{{orders}}</p>
    <div v-for="order in orders" v-bind:key="order._id">
    <p>hello</p>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'get-order',
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
      this.customer = responseData._id
    })
    const vm = this
    Api.get(`/customers/${this.customer}/orders`).then(response => {
      vm.orders = response.data.orders
      console.log(response.data.orders)
    }).catch(function (err) {
      console.log(err)
    })
  },
  data() {
    return {
      customer: '',
      orders: {}
    }
  }

}
</script>
