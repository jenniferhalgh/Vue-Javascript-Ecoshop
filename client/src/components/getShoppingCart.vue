<template>
  <div>
    <div v-if="itemsInCart">
      <div v-for="(item, index) in shoppingCart" v-bind:key="item._id">
          <p>{{itemNames[index]}}</p>
          <p>{{itemPrice[index]}} kr</p>
          <a href="#" class="btn btn-light" v-on:click="removeFromCart(item)">Remove From Cart</a>
      </div>
    </div>
    <div v-else>
      <p>No Items in Cart</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'shopping-cart',
  components: {},
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
      if (this.shoppingCart == null) {
        this.itemsInCart = false
      } else {
        this.itemsInCart = true
      }
    }).catch(error => {
      console.error(error)
    })
  },
  data() {
    return {
      customer: '',
      itemNames: [],
      shoppingCart: [],
      itemsInCart: false,
      itemPrice: [],
      itemQuantity: []
    }
  },
  methods: {
    removeFromCart(item) {
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
        Api.delete(`/customers/${this.customer}/shoppingCart/${item}`).then((res) => {
          this.$bvModal.msgBoxOk('Removed from cart!')
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

  <style>
  .p{
  text-align: right;
  }
  .a{
  background: #99ae71 !important;
  }
  </style>
