<template>
  <div>
    <div class="shoppingCart">
    <getDropdownCart/>
  </div>
      <div id="search-wrapper">
      <b-form-input class="search" type="text" v-model="input" placeholder="Search For Items"></b-form-input>
      </div>
    <b-form-select
          v-model="category"
          :options="categoryList"
          class="input filter-1"
          style="width: 15%"
          size="sm"
          v-on:change="getSelectedCategory(category)">
      </b-form-select>
      <b-form-select
          v-model="store"
          :options="stores"
          class="input filter-2"
          style="width: 15%"
          size="sm"
          v-on:change="getSelectedStore(store)">
      </b-form-select>
    <div class="card-deck top-buffer">
      <div id="card-div" v-for="(item, index) in filteredList()" v-bind:key="item.name">
        <div class="wrapper">
      <div class="card border-light mb-5" style="min-width: 7rem;">
    <img class="card-img-top img-fluid" id="img" v-bind:src="require(`@/assets/${item.image}`)" alt="Card image top">
<div class="card-body">
  <div v-if="item.category!='Default'">
<a href="#" class="badge badge-secondary">{{item.category}}</a>
  </div>
  <div v-else><span class="badge default">Default</span></div>
  <h6 class="card-subtitle mb-2 text-muted"> {{itemStoreNames[index]}}</h6>
  <p class="lead">{{item.name}}</p>
  <p class="lead">{{item.price}} kr</p>
  <a href="#" class="btn btn-add" v-on:click="addToCart(item)">Add to cart</a>
  </div>
</div>
   </div>
   </div>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import getDropdownCart from '../components/getDropdownCart.vue'

export default {
  name: 'catalogue',
  components: { getDropdownCart },
  async mounted() {
    Api.get('/items').then(response => {
      console.log(response.data.items)
      this.items = response.data.items
      const vm = this
      for (let i = 0; i < response.data.items.length; i++) {
        Api.get(`/items/${response.data.items[i]._id}`).then(response => {
          console.log(response.data.store.name)
          vm.itemStoreNames.splice(i, 0, response.data.store.name)
        })
          .catch(error => {
            console.error(error)
          })
      }
    }).catch(error => {
      console.error(error)
    })
    console.log(this.itemStoreNames)
    const vm = this
    // put store names in stores array for filter
    Api.get('/stores').then(response => {
      response.data.stores.forEach(function (store) {
        vm.stores.push({ value: store.name, text: store.name })
        console.log(vm.stores)
      })
    }).catch(error => {
      console.error(error)
    })
  },
  data() {
    return {
      category: '',
      categoryList: [
        { value: '', text: '--Select category--' },
        { value: 'Second Hand', text: 'Second Hand' },
        { value: 'Vegan', text: 'Vegan' },
        { value: 'Small Creator', text: 'Small Creator' }
      ],
      items: [],
      customer: '',
      itemStoreNames: [],
      input: '',
      stores: [{ value: '', text: '--Select store--' }],
      store: ''
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
        if (response.status === 401) {
          this.$bvModal.msgBoxOk('Unauthorized. Please log in again')
          sessionStorage.setItem('token', null)
          this.$router.push('/signIn')
        } else {
          return response.json()
        }
      }).then((responseData) => {
        this.customer = responseData._id
        Api.patch(`/customers/${this.customer}/shoppingCart/${item._id}`).then((res) => {
          this.$bvModal.msgBoxOk('Added to cart!')
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
    },
    getSelectedCategory(category) {
      if (category === '') {
        const vm = this
        vm.itemStoreNames = []
        Api.get('/items').then((res) => {
          this.items = res.data.items
          for (let i = 0; i < res.data.items.length; i++) {
            Api.get(`/items/${res.data.items[i]._id}`).then(response => {
              console.log(response.data.store.name)
              vm.itemStoreNames.splice(i, 0, response.data.store.name)
            })
              .catch(error => {
                console.error(error)
              })
          }
        },
        (err) => {
          console.log(err.response)
          this.boxOne = ''
          this.error = err.response.data.error
          this.$bvModal.msgBoxOk(this.error)
        }
        )
      } else {
        const vm = this
        vm.itemStoreNames = []
        Api.get(`/items/category/${category}`).then((res) => {
          this.items = res.data

          for (let i = 0; i < res.data.length; i++) {
            Api.get(`/items/${res.data[i]._id}`).then(response => {
              console.log(response.data.store.name)
              vm.itemStoreNames.splice(i, 0, response.data.store.name)
            })
              .catch(error => {
                console.error(error)
              })
          }
        })
      }
    },
    filteredList() {
      return this.items.filter(items => {
        return items.name.toLowerCase().includes(this.input.toLowerCase())
      })
    },
    getSelectedStore(store) {
      if (store === '') {
        const vm = this
        vm.itemStoreNames = []
        Api.get('/items').then((res) => {
          this.items = res.data.items

          for (let i = 0; i < res.data.items.length; i++) {
            Api.get(`/items/${res.data.items[i]._id}`).then(response => {
              console.log(response.data.store.name)
              vm.itemStoreNames.splice(i, 0, response.data.store.name)
            })
              .catch(error => {
                console.error(error)
              })
          }
        },
        (err) => {
          console.log(err.response)
          this.boxOne = ''
          this.error = err.response.data.error
          this.$bvModal.msgBoxOk(this.error)
        }
        )
      }
      const vm = this
      const storeFilterList = []
      vm.itemStoreNames = []
      Api.get('/stores').then(response => {
        response.data.stores.forEach(function (shop) {
          if (shop.name === store) {
            shop.items.forEach(function (itemId) {
              Api.get(`/items/${itemId}`).then(response => {
                storeFilterList.push(response.data)
                vm.itemStoreNames.push(shop.name)
              }).catch(error => {
                console.error(error)
              })
            })
            vm.items = storeFilterList
            console.log(vm.items)
            console.log(storeFilterList)
          }
        })
      }).catch(error => {
        console.error(error)
      })
    }
  }
}
</script>

<style>

.card-deck{
  margin-left: 20px !important;
}

.card-body {
    color: rgb(0, 0, 0) !important;
    background-color: rgb(255, 255, 255) !important;
}

.card {
  margin-bottom: 30px;
  width:20rem;
}

.top-buffer{margin-top:70px;}

.ml-1{
  margin-left:100px
}

.btn{
background: #99ae71 !important;
color: #ffffff;
}

.filter{
  margin-top:70px;
  width: auto
}

.filter-1, .filter-2{
  margin-top: 10px;
  margin-left: 1.25rem !important;
}

.badge{
  margin-bottom:10px;
}

.badge.default{
  margin-bottom:10px;
  color: rgb(255, 255, 255);
  background-color: rgb(255, 255, 255);
}

.lead{
  margin-bottom:0px;
}
#search-wrapper{
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
}

.search{
  width: auto;
}
.shoppingCart{
  margin-bottom: 10px;
  margin-top: 10px;
}

.btn-add{
  width: 100% !important;
}

@media (min-width: 360px) and (max-device-height: 768px){
.card, #card-div {
  max-width: 50% !important;
}

.card-deck{
  flex-direction: row !important;
  flex-wrap: wrap !important;
}

p, h6{
  font-size: 60% !important;
}

.add{
  min-width: 15px !important;
  font-size: 60% !important;
}

.badge{
  width: 60%;
  font-size: 60% !important;
}

.card-body{
  height: 50% !important;
  padding: 0.80rem !important;
  padding-top: 0rem !important;
}

.top-buffer{
  margin-top: 30px !important;
}
}

</style>
