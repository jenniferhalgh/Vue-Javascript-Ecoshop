<template>
  <div>
    <checkout />
      <h1>Order Summary</h1>
      <div class="order">
      <ul class="list-group mt-5">
    <h5 class="list-group-item">Products</h5>
        <li class="list-group-item" v-for="(item, index) in shoppingCart" v-bind:key="item._id">
          <p class="one">{{itemNames[index]}}</p><p class="two">{{itemPrice[index]}}</p>
          </li>
        <li class="list-group-item"><h6 class="one">Subtotal</h6><h6 class="two">{{totalSum}}</h6></li>
        <li class="list-group-item"><p class="one">Shipping</p><p class="two">50</p></li>
        <li class="list-group-item"><h5 class="one">Total cost</h5><h5 class="two">{{totalSum+50}}</h5></li>
  </ul>
      </div>
      <div class="buttons">
        <button class="btn btn1 btn-order one" variant="primary" v-on:click="myFunction()">Cancel</button>
          <button class="btn btn2 btn-order two" variant="primary" v-on:click="postOrder()">Confirm</button>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import checkout from '../components/CheckOut.vue'

export default {
  name: 'order',
  components: { checkout },
  mounted() {
    const jwttoken = {
      token: sessionStorage.getItem('token')
    }

    fetch('/customer', {
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
      const vm = this
      Api.get(`/customers/${this.customer}/shoppingCart`).then(response => {
        console.log(response.data)
        vm.shoppingCart = response.data.items
        response.data.items.forEach(function (item) {
          Api.get(`/items/${item}`).then(response => {
            vm.itemNames.push(response.data.name)
            vm.itemPrice.push(response.data.price)
            vm.totalSum = vm.totalSum + response.data.price
            console.log(vm.totalSum)
            vm.itemQuantity.push(response.data.quantity)
          })
            .catch(error => {
              console.error(error)
            })
        })
      })
    }).catch(error => {
      console.error(error)
    })
    console.log('hello')
  },
  data() {
    return {
      customer: '',
      itemNames: [],
      shoppingCart: [],
      itemPrice: [],
      itemQuantity: [],
      totalSum: 0
    }
  },
  methods: {
    postOrder() {
      const newOrder = {
        items: [],
        customers: this.customer,
        total_sum: this.totalSum
      }
      Api.post(`/customers/${this.customer}/orders`, newOrder).then((res) => {
        this.$bvModal.msgBoxOk('Order completed!')
      }).catch(function (err) {
        console.log(err)
      })
      this.$router.push('/')
    },
    myFunction() {
      location.replace('http://localhost:8080/shoppingCart')
    }
  }

}
</script>

<style>
.one {
  float: left;
  text-align: left;
  display: flex;
flex-direction: column;
}
.two {
  float: right;
  text-align: right;
  display: flex;
flex-direction: column !important;
}

.order{
float: none !important;
margin-left: auto !important;
margin-right: auto !important;
width: 80% !important;
}
.btn1{
color: rgb(255, 255, 255);
background-color: rgb(180, 12, 12) !important;
}

.btn-order{
  width: auto !important;
}

.buttons {
float: auto;
  margin-left: auto !important;
  margin-right: auto !important;
  width: 30% !important;
}
@media (min-device-width: 360px) and (max-device-height: 900px) {
.btn-order{
font-size: 60% !important;
margin-right: auto;
margin-left:auto;
}
.buttons{
width: 50% !important;
margin-right: auto;
margin-left:auto;
}
}

</style>
