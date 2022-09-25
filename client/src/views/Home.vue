<template>
  <div>
    <router-link class="link" to="/shoppingCart">
        <div class="dropdown">
        <b-button class="shopingcart-dropdown"> Shopping Cart</b-button>
        <div class="shoppingcart-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
        </div>
      </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'items',
  mounted() {
    Api.get('/items').then(response => {
      this.items = response.data.items
    })
      .catch(error => {
        console.error(error)
      })
  },
  data() {
    return {
      category: null,
      categoryList: [
        { value: null, text: 'Filter' },
        { value: 'Second Hand', text: 'Second Hand' },
        { value: 'Vegan', text: 'Vegan' },
        { value: 'Small Creator', text: 'Small Creator' }
      ],
      items: []
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
