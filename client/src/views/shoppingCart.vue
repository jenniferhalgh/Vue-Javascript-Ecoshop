<template>
  <div>
    <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
      <p style="color:#99ae71; font-size: 40px">SHOPPING CART </p>
    </div>
    <getShoppingCart/>
    <hr>
        <router-link class="links ml-5" to="/checkout">
        <button type="button" class="btn btn-successs">Checkout</button>
      </router-link>
  </div>
  </template>

<script>
// @ is an alias to /src
import getShoppingCart from '../components/getShoppingCart.vue'

export default {
  name: 'shopping-cart',
  components: { getShoppingCart },
  methods: {
  },
  data() {
    return {
      shoppingCart: []
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
