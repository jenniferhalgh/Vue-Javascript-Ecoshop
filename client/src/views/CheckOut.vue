<template>
  <div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'checkout',
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
      items: []
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
