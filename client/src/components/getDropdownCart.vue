<template>
    <div>
      <router-link class="links ml-5" to="/shoppingCart" @click="location.reload()">
          <div class="dropdown">
          <b-button class="shoppingcart-dropdown" @click="location.reload()"> Shopping Cart</b-button>
          <div class="shoppingcart-content">
            <ul class="list-group">
          <li class="list-group-item" v-for="(item, index) in shoppingCart" v-bind:key="item._id">
            <p class="one">{{itemNames[index]}}</p> <a href="#" class="three" v-on:click="removeFromCart(item)">X</a><p class="two">{{itemPrice[index]}}</p>
            </li>
          <li class="list-group-item"><h6 class="one">Subtotal</h6><h6 class="two">{{totalSum}}</h6></li>
    </ul>
          </div>
          </div>
        </router-link>
    </div>
</template>
<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  components: { },
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
      const vm = this
      Api.get(`/customers/${this.customer}/shoppingCart`).then(response => {
        console.log(response.data)
        vm.shoppingCart = response.data.items
        response.data.items.forEach(function (item) {
          Api.get(`/items/${item}`).then(response => {
            vm.itemNames.push(response.data.name)
            vm.itemPrice.push(response.data.price)
            vm.totalSum = vm.totalSum + response.data.price
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
      itemQuantity: [],
      totalSum: 0
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
          location.reload()
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
    .shoppingcart-dropdown {
      background-color: none;
      color: white;
      font-size: 16px;
      border: none;
      width: 250px !important;
    }
    .dropdown {
      position: relative;
      display: inline-block;
      float: right;
    }
    .shoppingcart-content {
      display: none;
      position: absolute;
      background-color: #f1f1f1;
      min-width: 200px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
      color: black;
      width: 250px;
    }
    .shoppingcart-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
    .shoppingcart-content a:hover { background-color: #ddd;}
    .dropdown:hover .shoppingcart-content {display: block;}

    .three{
      color: rgb(191, 24, 24) !important;
      background-color: rgb(255, 255, 255) !important;
      width: auto !important;
      height: auto !important;
      margin-top: -12px;
    }

    @media (min-device-width: 360px) and (max-device-height: 768px){
   }

</style>
