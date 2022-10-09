<template>
  <div>
    <h1> STORES </h1>
    <div class="buttons">
      <button class="btn btn-create one" onclick="document.getElementById('addStore').style.display='block'"> Add new store </button>
      <button class="btn btn-danger btn-delete two" @click="deleteAllStores()"> Delete All Stores </button>
      <br>
      <br>
      <br>
    </div>
      <div class="container-fluid mb-3" v-for="store in allStores" v-bind:key="store._id">
        <h5> {{store.name}} <button class="btn btn-edit" onclick="document.getElementById('storeName').style.display='block'">Edit</button></h5>
        <p class="text-muted"> ID: {{store._id}}</p>
    <hr class="hr-dotted">
    <button class="btn " onclick="document.getElementById('addItem').style.display='block'" v-on:click="currentStore=store._id">Add new item</button>
    <button class="btn" @click="showItems(store)" onclick="document.getElementById('showItems').style.display='block'" v-bind:key="store._id">View all items</button>
    <button class="btn btn-danger btn-delete" @click="deleteStore(store)">Delete store</button>
    <hr>
    </div>
    <br>
    <div class="nav-bar">
  <b-button variant="danger" class="btn btn-block" @click="deleteItems()"> Delete All Items </b-button>
    </div>

<!-- Add store -->
    <div id="addStore" class="modal">
        <form class="modal-content" @submit.prevent="createStore()">
           <div class="container">
            <span onclick="document.getElementById('addStore').style.display='none'" class="close" title="Close">&times;</span>
          <h5> Add New Store </h5>
          <div>
          <input type="text" class="form-control" v-model="name" placeholder="Name" />
          </div>
          <br>
          <button type="submit" class="btn btn-block">Add New Store</button>
        </div>
      </form>
       </div>

<!-- Update store name -->
    <div id="storeName" class="modal">
        <form class="modal-content" @submit.prevent="updateStore(store)">
           <div class="container">
          <div class="form-update">
          <span onclick="document.getElementById('storeName').style.display='none'" class="close" title="Close">&times;</span>
        <div>
        <input type="text" class="form-control" v-model="name" placeholder="Store name" />
        </div>
        <br>
        <button type="submit" class="btn btn-block">Update</button>
        </div>
        </div>
      </form>
       </div>

<!-- Add item in store -->
       <div id="addItem" class="modal">
        <form class="modal-content" @submit.prevent="createItem()">
           <div class="container">
          <div class="form-update">
          <span onclick="document.getElementById('addItem').style.display='none'" class="close" title="Close">&times;</span>
        <div>
          <input type="text" class="form-control" v-model="name" placeholder="Name" />
          </div>
          <br>
          <div>
          <input type="text" class="form-control" v-model="price" placeholder="Price" />
          </div>
          <br>
          <div>
         <input class="form-control" type="file" id="itemFile" v-on:change="readImage()">
          </div>
          <br>
          <label for="category-select">Choose a category:</label>
          <b-form-select
            v-model="category"
            :options="categoryList"
            class="form-select"
            style="width: 15%"
            size="sm"
            v-on:change="getSelectedCategory(category)">
          </b-form-select>
          <br>
          <button type="submit" class="btn btn-block">Create New Item</button>
        </div>
        </div>
      </form>
       </div>

<!-- Show items in store -->
       <div id="showItems" class="modal modal-items">
           <div class="container">
             <ul class="list-group mt-5 ml-4">
      <h5 class="list-group-item">Items <span onclick="document.getElementById('showItems').style.display='none'" class="close" title="Close">&times;</span></h5>
      <div v-for="item in storeItems" v-bind:key="item._id">
 <li class="list-group-item itemList">
  <div class="container">
     <img class="img mr-5" id="img" v-bind:src="require(`@/assets/${item.image}`)" alt="">
    <p>ID: {{item._id}}<button class="btn btn-edit two" onclick="document.getElementById('updateItem').style.display='block'" v-on:click="currentItem=item._id">Edit</button></p>
    <p>Name: {{item.name}}</p>
    <p>Price: {{item.price}}</p>
    <p>Category: {{item.category}}</p>
  </div>
            </li>
      </div>
    </ul>
       </div>
       </div>

       <div id="updateItem" class="modal">
        <form class="modal-content" @submit.prevent="updateItems()">
           <div class="container">
            <span onclick="document.getElementById('updateItem').style.display='none'" class="close" title="Close">&times;</span>
        <input type="text" class="form-control" v-model="name" placeholder="Item name" />
        <br>
        <input type="Number" class="form-control" v-model="price" placeholder="Item price" />
        <br>
          <input class="form-control" type="file" id="itemFile" v-on:change="readImage()">
          <br>
        <label for="category-select">Choose a category:</label>
          <b-form-select
            v-model="category"
            :options="categoryList"
            class="form-select"
            style="width: 15%"
            size="sm"
            v-on:change="getSelectedCategory(category)">
          </b-form-select>
        <button type="submit" class="btn btn-block">Update</button>
    </div>
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
        name: '',
        store_id: ''
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
        { value: 'Default', text: '--Select category--' },
        { value: 'Second Hand', text: 'Second Hand' },
        { value: 'Vegan', text: 'Vegan' },
        { value: 'Small Creator', text: 'Small Creator' }
      ],
      items: {},
      allItems: [],
      storeItems: [],
      currentStore: '',
      currentItem: ''

    }
  },
  methods: {
    deleteAllStores() {
      if (confirm('Are you certain that you want to delete all stores? This action cannot be undone.')) {
        Api.delete('/stores').then((res) => {
          this.$bvModal.msgBoxOk('All Stores Are Deleted')
        })
          .catch(error => {
            console.error(error)
          })
      }
    },
    deleteStore(store) {
      Api.delete(`/stores/${store._id}`).then((res) => {
        this.$bvModal.msgBoxOk(store.name + ' (ID: ' + store._id + ') has been deleted.')
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
    createItem() {
      Api.get(`/stores/${this.currentStore}`).then(response => {
        console.log(response.data)
        this.stores = response.data
        const vm = this
        const newItem = {
          name: this.name,
          price: this.price,
          category: this.category,
          image: this.image,
          store: this.currentStore

        }
        Api.post(`/stores/${this.currentStore}/items`, newItem).then((res) => {
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
    updateItems() {
      Api.get(`/items/${this.currentItem}`).then(response => {
        console.log(response.data)
        this.items = response.data
        const vm = this
        const itemUpdate = {
          name: this.name,
          price: this.price,
          category: this.category,
          image: this.image
        }
        Api.patch(`/items/${this.currentItem}`, itemUpdate).then(response => {
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
    },
    readImage() {
      const file = document.getElementById('itemFile')
      console.log(file.value)
      this.image = file.value.split(/(\\|\/)/g).pop()
    },
    showItems(store) {
      this.storeItems = []
      console.log(this.storeItems)
      console.log(store)
      console.log(store.items)
      const vm = this
      store.items.forEach(function (item) {
        Api.get(`/items/${item}`).then(response => {
          vm.storeItems.push(response.data)
        })
          .catch(error => {
            console.error(error)
          })
        console.log(vm.storeItems)
      })
    },
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

<style>

.buttons {
   float: none !important;
    margin-left: auto !important;
    margin-right: auto !important;
}

.hr-dotted {
  border: none;
  border-top: 3px dotted rgb(0, 0, 0);
  color: #fff;
  background-color: #fff;
  height: 1px;
  width: 100%;
}

.btn_message {
  margin-bottom: 1em;
}
.primary{
  margin-bottom: 1em;
  float: right;
  width: 350px;
}
.nav-bar{
margin-left: 100px;
margin-right: 100px;
}

.btn-edit{
 width: auto;
}

.btn{
  width: auto !important;
}

.btn-create, .btn-delete{
  display: inline-block !important;
}

.img{
  width: 10% !important;
  float: left !important;

}

.itemList{
  height: 180px !important;
}

.modal{
  width: 50% !important;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10% !important;
}

.modal-items{
  width: 100% !important;
}

@media (min-device-width: 360px) and (max-device-height: 768px) {
  .delete-button{
    display: block !important;
   }
  .primary{
    width: auto !important;
    display: block;
  }
  .navbar{
    float: center;
  }
  .b-form-select{
    width: 150px;
  }

  .img{
    width: 20% !important;
  }

  .btn{
    width: auto !important;
    font-size: 60% !important;
  }

  .modal{
    width: 90% !important;
  }

  .modal-items{
    width: 100% !important;
    margin-left: -7% !important;
  }

  .itemList{
  height: auto !important;
}
}
</style>
