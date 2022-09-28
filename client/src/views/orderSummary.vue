<template>
    <div>
      <checkout />
        <h1>Order Summary</h1>
        <div v-for="(item, index) in shoppingCart" v-bind:key="item._id">
          <p>{{itemNames[index]}}</p>
          <p>{{itemPrice[index]}} kr</p>
          </div>
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
      itemQuantity: []
    }
  },
  methods: {
    postOrder() {
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
        Api.post(`/customers/${this.customer}/orders`).then((res) => {
          this.$bvModal.msgBoxOk('Order completed!')
          this.$router.push('/')
        },
        (err) => {
          console.log(err.response)
          this.boxOne = ''
          this.error = err.response.data.error
          this.$bvModal.msgBoxOk(this.error)
        }
        )
      }).catch(function (err) {
        console.log(err)
      })
    }
  }

}
</script>
