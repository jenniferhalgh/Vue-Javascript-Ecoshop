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
      <div class="search-wrapper">
    <b-form-input type="text" v-model="input" placeholder="Search For Items" style="width: 50%"></b-form-input>
    </div>
      <b-form-select
          v-model="category"
          :options="categoryList"
          class="input"
          placeholder="Category"
          style="width: 10%"
          size="sm"
      ></b-form-select>
    <div class="card-deck top-buffer ml-4">
    <div v-for="item in items" v-bind:key="item._id">
      <div class="card border-light mb-5" style="width:20rem;">
    <img class="card-img-top" src="@/assets/white_shirt.jpeg" alt="Card image top">
<div class="card-body">
  <h4 class="card-title"><a>{{item.name}}</a></h4>
  <h4 class="card-title"><a>{{item.price}}kr</a></h4>
  <a href="#" class="btn btn-dark" v-on:click="addToCart(item)">Add to cart</a>
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
      console.log(response.data.items)
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
      items: [],
      customer: '',
      input: ''
    }
  },
  computed: {
    filteredList() {
      return this.items.filter(item => {
        return item.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    addToCart(item) {
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
        Api.patch(`/customers/${this.customer}/shoppingCart/${item._id}`).then((res) => {
          this.$bvModal.msgBoxOk('Added to cart!')
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
  }
}
</script>

<style>

.container {
  display: flex;
  align-items: center;
  justify-content: center
}
.card-body {
    color: rgb(0, 0, 0) !important;
    background-color: rgb(255, 255, 255) !important;
}

.top-buffer{margin-top:100px;}

.ml-1{
  margin-left:100px
}
</style>
