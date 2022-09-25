<template>
  <div>
      <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
          <p style="color:#99ae71; font-size: 40px">SHOPPING CART </p>
      </div>
      <div v-if="itemsInCart">
          <div class="row">
              <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                  <ul class="list-group">
                      <div v-for="shoppingCart in shoppingCart" v-bind:key="shoppingCart._id">
                          <p> {{shoppingCart}}</p>
                          <a href="#" class="btn btn-light" v-on:click="removeFromCart(item)">Remove From Cart</a>
                      </div>
                  </ul>
              </div>
          </div>
          <hr>
          <div class="row">
              <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                  <button type="button" class="btn btn-successs">Checkout</button>
              </div>
          </div>
      </div>
      <div v-else>
          <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
              <p>No Items in Cart</p>
          </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'Shopping Cart',
  components: { },
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
      Api.get(`/customers/${this.customer}/shoppingCart`).then(response => {
        this.shoppingCart = response.data.items
        console.log(response.data)
        if (this.shoppingCart == null) {
          this.itemsInCart = false
        } else {
          this.itemsInCart = true
        }
      })
    }).catch(function (err) {
      console.log(err)
    })
  },
  data() {
    return {
      shoppingCart: [],
      itemsInCart: false
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
        Api.delete(`/customers/${this.customer}/shoppingCart/${item._id}`).then((res) => {
          this.$router.push('/shoppingCart')
          this.$bvModal.msgBoxOk('Removed from cart!')
          console.log(res)
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
  },
  getItems() {
    Api.get('/items').then(response => {
      this.items = response.data.items
      console.log(response.data.items)
    })
      .catch(error => {
        console.error(error)
      })
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
