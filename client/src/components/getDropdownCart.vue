<template>
    <div>
      <router-link class="links ml-5" to="/shoppingCart">
          <div class="dropdown">
          <b-button class="shopingcart-dropdown"> Shopping Cart</b-button>
          <div class="shoppingcart-content">
            <getShoppingCart/>
          </div>
          </div>
        </router-link>
    </div>
</template>
<script>
// @ is an alias to /src
import getShoppingCart from '@/components/getShoppingCart.vue'

export default {
  name: 'home',
  components: { getShoppingCart },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
    .shopingcart-dropdown {
      background-color: none;
      color: white;
      font-size: 16px;
      border: none;
      width: 160px;
      height: 50px;
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
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
      color: black;
    }
    .shoppingcart-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
    }
    .shoppingcart-content a:hover {background-color: #ddd;}
    .dropdown:hover .shoppingcart-content {display: block;}
</style>
