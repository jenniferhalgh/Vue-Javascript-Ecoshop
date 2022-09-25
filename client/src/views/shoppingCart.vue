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
  }
}
</script>

<style>
.p{
    text-align: right;
}
</style>
