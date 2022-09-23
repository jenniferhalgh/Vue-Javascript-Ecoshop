<template>
  <div>
    <div class="card-deck top-buffer ml-4">
    <div v-for="item in items" v-bind:key="item._id">
      <div class="card border-light mb-5" style="width:20rem;">
    <img class="card-img-top" src="@/assets/white_shirt.jpeg" alt="Card image top">
<div class="card-body">
  <h4 class="card-title"><a>{{item.name}}</a></h4>
  <h4 class="card-title"><a>{{item.price}}kr</a></h4>
  <a href="#" class="btn btn-dark" v-on:click="addToCart()">Add to cart</a>
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
      items: [],
      customer: ''
    }
  },
  methods: {
    addToCart() {
      const jwttoken = {
        token: localStorage.getItem('token')
      }
      this.$bvModal.msgBoxOk(JSON.stringify(jwttoken))
      fetch('http://localhost:3000/customer', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Host: '',
          token: jwttoken.token
        }
      }).then((response) => {
        this.$bvModal.msgBoxOk(response)
      },
      (err) => {
        console.log(err.response)
        this.boxOne = ''
        this.error = err.response.data.error
        this.$bvModal.msgBoxOk(this.error)
      }
      )
      Api.patch(`/customers/${this.customer}/shoppingCart/${this.item._id}`).then((res) => {
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
