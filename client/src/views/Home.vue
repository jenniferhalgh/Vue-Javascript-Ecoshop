<template>
  <div>
    <getDropdownCart/>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import getDropdownCart from '../components/getDropdownCart.vue'

export default {
  name: 'home',
  components: { getDropdownCart },
  props: {
    customer: Object
  },
  mounted() {

  },
  data() {
    return {

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
.delete-button {
 margin-top: 10px;
}
</style>
