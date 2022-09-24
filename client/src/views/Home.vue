<!-- eslint-disable no-tabs -->
<template>
  <div>
    <div id="navbar">
      <b-form-input type="search" v-model="input" placeholder="Search For Items" style="width: 50%"></b-form-input>
      <div class="items" v-for="item in items" v-bind:key="item.name">
      </div>
      <div class="item error" v-if="input&&!items.length">
        <p>No results found!</p>
      </div>
      <b-form-select
          v-model="category"
          :options="categoryList"
          class="input"
          placeholder="Category"
          style="width: 10%"
          size="sm"
      ></b-form-select>
      <div class="dropdown">
        <div class="dropdown">
        <b-button class="shopingcart-dropdown"></b-button>
        <div class="shoppingcart-content">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </div>
      </div>
    </div>
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
/* Dropdown Button */
.shopingcart-dropdown {
  background-color: none;
  color: white;
  font-size: 16px;
  border: none;
  width: 160px;
  height: 50px;
}
/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
  float: right;
}
/* Dropdown Content (Hidden by Default) */
.shoppingcart-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.shoppingcart-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.shoppingcart-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
.dropdown:hover .shoppingcart-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .shopingcart-dropdown {background-color: #3e8e41;}

</style>
