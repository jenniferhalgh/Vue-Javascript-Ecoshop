<template>
    <div>
    <h1>Order History</h1>
    <div id="block" v-for="order in orders" v-bind:key="order._id">
        <h6> Order Id: {{order._id}}</h6>
        <p> Total cost: {{order.total_sum + 50}} kr</p>
        <div class="button">
        <b-button class="btn-block btn-order" onclick="document.getElementById('order').style.display='block'" v-on:click="viewDetails(order)">
           View details
        </b-button>
      </div>
    </div>

<div id="order" class="modal">
        <div class="container">
          <ul class="list-group">
            <h5 class="list-group-item">Products
            <span
              onclick="document.getElementById('order').style.display='none'" class="close" title="Exit">&times;</span>
            </h5>
          <li class="list-group-item" v-for="(item, index) in itemNames" v-bind:key="item">
            <p class="one">{{itemNames[index]}}</p><p class="two">{{itemPrices[index]}}</p>
            </li>
          <li class="list-group-item"><h6 class="one">Subtotal</h6><h6 class="two">{{totalSum}}</h6></li>
          <li class="list-group-item"><p class="one">Shipping</p><p class="two">50</p></li>
          <li class="list-group-item"><h5 class="one">Total cost</h5><h5 class="two">{{totalSum+50}}</h5></li>
    </ul>
        </div>
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
    let host = window.location.origin
    if (host === 'https://group20-ecoshop.herokuapp.com') {
      host = 'http://localhost:5000/'
    } else {
      host = 'http://localhost:3000/'
    }
    fetch(`${host}customer`, {
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
      itemNames: [],
      itemPrices: [],
      totalSum: 0
    }
  },
  methods: {
    viewDetails(order) {
      this.itemNames = []
      this.itemPrices = []
      this.totalSum = 0
      Api.get(`/customers/${this.customer}/orders/${order._id}`).then(response => {
        const vm = this
        response.data[0].items.forEach(function (item) {
          Api.get(`/items/${item}`).then(response => {
            vm.itemNames.push(response.data.name)
            vm.itemPrices.push(response.data.price)
            console.log(response.data)
            vm.totalSum = vm.totalSum + response.data.price
          }).catch(function (err) {
            console.log(err)
          })
        })
      }).catch(function (err) {
        console.log(err)
      })
    }
  }

}
</script>

<style scoped>
#block{
    background-color:#cad7b3;
    border-block: solid;
    writing-mode: horizontal-tb;
    margin-top: 3rem;
}

.close{
  margin-left: auto;
}
.button{
  margin-left: 10px;
  margin-right: 10px;
  height: 50px;
  padding: 10px;
}
.btn-order{
  color: black;
  font-size: 100% !important;
}
.container{
  margin-top: 121px;
}
.modal{
  width: 100% !important;
  margin-right: 20px !important;
}
.list-group{
  margin-left: 10px;
  margin-top: 80px;
  color: black;
}
</style>
