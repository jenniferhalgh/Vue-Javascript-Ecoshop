<template>
  <div>
    <getShoppingCart/>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import getShoppingCart from '../components/getShoppingCart.vue'

export default {
  name: 'checkout',
  components: { getShoppingCart },
  mounted() {
    Api.get('/items').then(response => {
      this.items = response.data.items
    })
      .catch(error => {
        console.error(error)
      })
  },
  data() {
    return {
      category: null,
      categoryList: [
        { value: null, text: 'Filter' },
        { value: 'Second Hand', text: 'Second Hand' },
        { value: 'Vegan', text: 'Vegan' },
        { value: 'Small Creator', text: 'Small Creator' }
      ],
      items: [],
      shoppingCart: []
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
