<template>
    <div>
    <h1>Order History</h1>
    <div class="block" v-for="order in orders" v-bind:key="order._id">
        <h6> id:{{order._id}}</h6>
        <p> Total cost: {{order.total_sum}} kr</p>
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
      Api.get(`/customers/${this.customer}/orders`).then(response => {
        this.orders = response.data
        console.log(response.data)
      }).catch(function (err) {
        console.log(err)
      })
    }).catch(error => {
      console.error(error)
    })
  },
  data() {
    return {
      customer: '',
      orders: {},
      oItem: {}
    }
  }

}
</script>

<style scoped>
.green-text{
    color:#99ae71;
    text-align: center;
    font-size:160%
}
.block{
    background-color:#cad7b3;
    border-block: solid;
writing-mode: horizontal-tb;
}
</style>
