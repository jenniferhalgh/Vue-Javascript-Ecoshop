<template>
  <div>
    <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
      <p style="color:#99ae71; font-size: 40px" >SHOPPING CART </p>
    <getShoppingCart/>
    <br>
    <router-link class="links" to="/checkout/paymentMethod">
        <button type="button" class="btn btn-successs" @click="location.reload()">Checkout</button>
      </router-link>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import getShoppingCart from '@/components/getShoppingCart.vue'

export default {
  name: 'shopping-cart',
  components: { getShoppingCart },
  created() {
    if (sessionStorage.getItem('token') == null) {
      this.$bvModal.msgBoxOk('Unauthorized: Please log in')
      this.$router.push('/login')
      location.reload()
    }
  },
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
