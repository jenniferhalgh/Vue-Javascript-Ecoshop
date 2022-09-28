<template>
  <div>
    <p>All customers:</p>
    <div v-for="customer in customers" v-bind:key="customer._id">
    <p> {{customer.name.firstname}} {{customer.name.lastname}}</p>
    <button
      class="delete-button"
      v-if="customer.email === 'admin@gmail.com'"
      @click="deleteStores()">
      Delete All Stores
    </button>
  </div>
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
  created() {
    if (sessionStorage.getItem('token') == null) {
      this.$bvModal.msgBoxOk('Unauthorized: Please log in')
      this.$router.push('/login')
    }
  },
  data() {
    return {
      customers: []
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
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
