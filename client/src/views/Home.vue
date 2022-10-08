<template>
  <div>
  <div v-if="customer.email !='admin@gmail.com'">
    <getDropdownCart/>
  </div>
  ansndnas
  </div>
</template>

<script>
// @ is an alias to /src
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
  }
}
</script>

<style>
</style>
