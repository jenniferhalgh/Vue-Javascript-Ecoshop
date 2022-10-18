<template>
  <div>
    <div v-if="itemsInCart">
      <div>
        <ul class="list-group">
          <li class="list-group-item" v-for="(item, index) in shoppingCart" v-bind:key="item._id">
            <p class="one">{{itemNames[index]}}</p> <a href="#" class="three btn-danger" v-on:click="removeFromCart(item)">Remove</a><p class="two">{{itemPrice[index]}}</p>
            </li>
          <li class="list-group-item"><h6 class="one">Subtotal</h6><h6 class="two">{{totalSum}}</h6></li>
    </ul>
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
    let host = window.location.origin
    if (host === 'https://group20-ecoshop.herokuapp.com') {
      host = '/'
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
      let host = window.location.origin
      if (host === 'https://group20-ecoshop.herokuapp.com/') {
        host = '/'
      } else {
        host = 'http://localhost:3000/'
        console.log(host)
      }
      console.log(host)
      fetch(`${host}customer`, {
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
  .p{
  text-align: right;
  }
  .a{
  background: #99ae71 !important;
  }
  .three{
    margin-left: 5px;
    margin-right: 10px;
     float: right;
    text-align: right;
    display: flex;
 flex-direction: column !important;
  }

  .two{
    margin-left: 5px;
    margin-right: 10px;
     float: right;
    text-align: right;
    display: flex;
 flex-direction: column !important;
  }

  .btn-danger{
    margin-top: 2px;
    width: 70px;
    text-align: center !important;
    background-color: rgb(180, 12, 12) !important;
    color: white !important;
  }

  @media (min-device-width: 360px) and (max-device-height: 768px){
    .list-group{
      margin-left: auto !important;
      margin-top: 1rem !important;
    }
    .btn-danger{
    width: 50px;
    font-size: 60%;
  }
   }
  </style>
