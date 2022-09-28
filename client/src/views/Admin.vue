<template>
  <div>
    <h1> STORES: </h1>
    <button
      class="delete-button"
      @click="deleteStores()">
      Delete All Stores
    </button>
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
  },
  data() {
    return {
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
