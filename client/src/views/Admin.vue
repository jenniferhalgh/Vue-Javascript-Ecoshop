<template>
  <div>
    <h1> STORES </h1>
      <div v-for="store in allStores" v-bind:key="store._id">
        <p> {{store.name}}</p>
        <form @submit.prevent="updateStore(store)">
        <div>
        <input type="text" class="form-control" v-model="name" placeholder="Store name" />
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
    <br>
  </div>
  <div class="nav-bar">
  <b-button variant="danger" class="delete-button" @click="deleteStores()"> Delete All Stores </b-button>
    <router-link class="links ml-5" to="/createStore">
        <b-button class="create-button"> Create A Store </b-button>
      </router-link>
    </div>
  <h1> ITEMS </h1>
  <div v-for="store in allStores" v-bind:key="store._id">
        <p> {{store.name}}</p>
        <form @submit.prevent="createItem(store)">
          <div>
          <input type="text" class="form-control" v-model="name" placeholder="Name" />
          </div>
          <br>
          <div>
          <input type="text" class="form-control" v-model="price" placeholder="Price" />
          </div>
          <br>
          <label for="category-select">Choose a category:</label>
          <b-form-select
            v-model="category"
            :options="categoryList"
            class="input ml-5 filter"
            style="width: 15%"
            size="sm"
            v-on:change="getSelectedCategory(category)">
          </b-form-select>
          <br>
          <button type="submit" class="btn btn-primary">Create New Item</button>
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
  data() {
    return {
      storeData: {
        name: ''
      },
      allStores: [],
      stores: {},
      itemData: {
        name: '',
        price: '',
        category: '',
        store: '',
        _id: '',
        error: ''
      },
      category: '',
      categoryList: [
        { value: '', text: '--Select category--' },
        { value: 'Second Hand', text: 'Second Hand' },
        { value: 'Vegan', text: 'Vegan' },
        { value: 'Small Creator', text: 'Small Creator' }
      ]
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
    },
    createItem(store) {
      Api.get(`/stores/${store._id}`).then(response => {
        console.log(response.data)
        this.stores = response.data
        const vm = this
        const newItem = {
          name: this.name,
          price: this.price,
          category: this.category,
          store: store._id

        }
        Api.post(`/stores/${store._id}/items`, newItem).then((res) => {
          console.log(res.data)
          vm.items = []
          vm.items.push(newItem)
          this.$router.push('/admin')
          this.$bvModal.msgBoxOk('New item added')
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
.create-button{
  float: right
}
.delete-button{
  background: red !important
}
</style>
