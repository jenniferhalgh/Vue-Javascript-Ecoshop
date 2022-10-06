<template>
  <div>
    <h1> STORES </h1>
      <div v-for="store in allStores" v-bind:key="store._id">
        <h2> Update Store: </h2>
        <p> {{store.name}}</p>
        <form @submit.prevent="updateStore(store)">
        <div>
        <input type="text" class="form-control" v-model="name" placeholder="Store name" />
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
    <hr>
    <h2> Create Item In Store: </h2>
    <form @submit.prevent="createItem(store)">
          <div>
          <input type="text" class="form-control" v-model="name" placeholder="Name" />
          </div>
          <br>
          <div>
          <input type="text" class="form-control" v-model="price" placeholder="Price" />
          </div>
          <br>
          <div>
          <input type="text" class="form-control" v-model="image" placeholder="Image path" />
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
    <br>
  </div>
  <div class="nav-bar">
    <router-link to="/createStore">
      <b-button class="create-button"> Create A Store </b-button>
      </router-link>
      <br>
      <b-button variant="danger" class="delete-button" @click="deleteStores()"> Delete All Stores </b-button>
    </div>
    <h1> ITEMS </h1>
    <div v-for="item in allItems" v-bind:key="item._id">
      <h2> Update Item: </h2>
        <p> Name: {{item.name}}, Price: {{item.price}}, Category: {{item.category}}</p>
        <form @submit.prevent="updateItems(item)">
        <div>
        <input type="text" class="form-control" v-model="name" placeholder="Item name" />
        </div>
        <br>
        <div>
        <input type="Number" class="form-control" v-model="price" placeholder="Item price" />
        </div>
        <br>
        <div>
          <input type="text" class="form-control" v-model="image" placeholder="Image path" />
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
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
    </div>
    <div class="nav-bar">
  <b-button variant="danger" class="delete-button" @click="deleteItems()"> Delete All Stores </b-button>
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
    Api.get('/items').then(response => {
      console.log(response.data.items)
      this.allItems = response.data.items
    }).catch(error => {
      console.error(error)
    })
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
        image: '',
        error: ''
      },
      category: '',
      categoryList: [
        { value: '', text: '--Select category--' },
        { value: 'Second Hand', text: 'Second Hand' },
        { value: 'Vegan', text: 'Vegan' },
        { value: 'Small Creator', text: 'Small Creator' }
      ],
      items: {},
      allItems: []
    }
  },
  methods: {
    deleteStores() {
      if (confirm('Are you certain that you want to delete all stores? This action cannot be undone.')) {
        Api.delete('/stores').then((res) => {
          this.$bvModal.msgBoxOk('All Stores Are Deleted')
        })
          .catch(error => {
            console.error(error)
          })
      }
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
          image: this.image,
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
    },
    deleteItems(store) {
      if (confirm('Are you certain that you want to delete all items? This action cannot be undone.')) {
        Api.delete(`/stores/${store._id}/items`).then((res) => {
          this.$bvModal.msgBoxOk('All Items in this Store Are Deleted')
          this.$router.push('/admin')
          location.reload()
        })
          .catch(error => {
            console.error(error)
          })
      }
    },
    updateItems(item) {
      Api.get(`/items/${item._id}`).then(response => {
        console.log(response.data)
        this.items = response.data
        const vm = this
        const itemUpdate = {
          name: this.name,
          price: this.price,
          category: this.category,
          image: this.image
        }
        Api.patch(`/items/${item._id}`, itemUpdate).then(response => {
          console.log(response.data)
          vm.items = response.data
          console.log(vm.items)
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
  margin-bottom: 1em;
}
.delete-button{
  background: red;
}
.b-form-select{
    width: 150px;
  }

@media (min-device-width: 360px) and (max-device-height: 900px) {
  .delete-button{
    margin-left: 70px;
  }
  .create-button{
    margin-left: 70px;
  }
  .navbar{
    float: center;
  }
  .b-form-select{
    width: 150px;
  }
}
</style>
