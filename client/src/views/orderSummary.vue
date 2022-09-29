<template>
    <div>
      <checkout />
        <h1>Order Summary</h1>
        <ul class="list-group my-info mt-5 ml-5">
      <h6 class="list-group-item">Products</h6>
        <div v-for="(item, index) in shoppingCart" v-bind:key="item._id">
          <li class="list-group-item">{{itemNames[index]}} {{itemPrice[index]}} kr</li>
          </div>
          <li class="list-group-item">subtotal: {{total_sum}}</li>
    </ul>
          <button class="link; button" variant="primary" v-on:click="postOrder()">Complete Order</button>
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
      this.customer = responseData._id
      const vm = this
      Api.get(`/customers/${this.customer}/shoppingCart`).then(response => {
        console.log(response.data)
        vm.shoppingCart = response.data.items
        response.data.items.forEach(function (item) {
          Api.get(`/items/${item}`).then(response => {
            vm.itemNames.push(response.data.name)
            vm.itemPrice.push(response.data.price)
            vm.itemQuantity.push(response.data.quantity)
          })
            .catch(error => {
              console.error(error)
            })
        })
        vm.itemPrice.reduce(function (a, b) { return a + b }, 0)
      })
    }).catch(error => {
      console.error(error)
    })
  },
  data() {
    return {
      customer: '',
      itemNames: [],
      shoppingCart: [],
      itemPrice: [],
      itemQuantity: [],
      total_sum: 0
    }
  },
  methods: {
    postOrder() {
      const newOrder = {
        items: [],
        customers: this.customer,
        total_sum: 100
      }
      Api.post(`/customers/${this.customer}/orders`, newOrder).then((res) => {
        this.$bvModal.msgBoxOk('Order completed!')
        this.$router.push('/')
      },
      (err) => {
        console.log(err.response)
        this.boxOne = ''
        this.error = err.response.data.error
        this.$bvModal.msgBoxOk(this.error)
      }
      ).catch(function (err) {
        console.log(err)
      })
    }
  }

}
</script>
