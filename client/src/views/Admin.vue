<template>
  <div>
    <h1> STORES </h1>
    <button class="delete-button" @click="deleteStores()"> Delete All Stores </button>
    <br>
    <router-link class="links ml-5" to="/createStore">
        <button class="create-button"> Create A Store </button>
      </router-link>
      <div v-for="store in allStores" v-bind:key="store._id">
        <p> {{store.name}}</p>
        <form @submit.prevent="updateStore(store)">
        <div>
        <input type="text" class="form-control" v-model="name" placeholder="Store name" />
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'admin',
  components: { },
  mounted() {
    Api.get('/stores').then(response => {
      this.allStores = response.data.stores
      console.log(response.data.stores)
    })
      .catch(error => {
        console.error(error)
      })
  },
  created() {
    if (sessionStorage.getItem('token') == null) {
      this.$bvModal.msgBoxOk('Unauthorized: Please log in')
      this.$router.push('/signIn')
    }
  },
  data() {
    return {
      storeData: {
        name: ''
      },
      allStores: [],
      stores: {}

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
    },
    updateStore(store) {
      Api.get(`/stores/${store._id}`).then(response => {
        console.log(response.data)
        this.stores = response.data
        const vm = this
        const storeUpdate = {
          name: this.name
        }
        Api.patch(`/stores/${store._id}`, storeUpdate).then(response => {
          console.log(response.data)
          vm.stores = response.data
          console.log(vm.stores)
          location.reload()
        })
          .catch(error => {
            console.error(error)
          })
      }).catch(error => {
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
