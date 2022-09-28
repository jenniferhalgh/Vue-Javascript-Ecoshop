<template>
    <div>
      <form @submit.prevent="createStore">
          <h1> Add New Store </h1>
          <div>
          <input type="text" class="form-control" v-model="name" placeholder="Name" />
          </div>
          <br>
          <button type="submit" class="btn btn-primary">Create New Store</button>
      </form>
    </div>
  </template>
<script>
import { Api } from '@/Api'
export default {
  name: 'createStore',
  data() {
    return {
      storeData: {
        name: '',
        _id: '',
        error: ''
      }
    }
  },
  methods: {
    createStore() {
      const newStore = {
        name: this.name
      }
      Api.post('/stores', newStore).then((res) => {
        console.log(res.data)
        this.stores = []
        this.stores.push(newStore)
        this.$router.push('/admin')
        this.$bvModal.msgBoxOk('New item added')
        location.reload()
      },
      (err) => {
        console.log(err.response)
        this.error = err.response.data.error
        this.$bvModal.msgBoxOk(this.error)
      })
    }
  }
}
</script>
