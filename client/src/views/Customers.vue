<template>
  <div>
    <h1> STORES: </h1>
    <div v-for="customer in customers" v-bind:key="customer._id">
    <button
      class="delete-button"
      v-if="customer.email === 'admin@gmail.com'"
      @click="deleteStores()">
      Delete All Stores
    </button>
    </div>
    <br>
    <router-link class="links ml-5" to="/createStore">
        <button class="create-button"> Create A Store </button>
      </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'customers',
  mounted() {
    Api.get('/customers').then(response => {
      this.customers = response.data.customers
      console.log(response.data.customers)
    })
      .catch(error => {
        console.error(error)
      })
  },
  data() {
    return {
      customers: [],
      storeData: {
        name: ''
      }
    }
  },
  methods: {
    deleteStores() {
      Api.delete('/stores').then((res) => {
        this.$bvModal.msgBoxOk('All Stores Are Deleted')
      })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
