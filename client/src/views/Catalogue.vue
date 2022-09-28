<template>
<div>
<items/>
</div>
</template>
<script>

import items from '../components/getItem.vue'

export default {
  name: 'catalogue',
  components: { items },
  created() {
    if (sessionStorage.getItem('token') == null) {
      this.$bvModal.msgBoxOk('Unauthorized: Please log in')
      this.$router.push('/login')
    }
  },
  data() {
  },
  methods: {
  }
}
</script>

<style>
.btn_1 {
  color: white;
  background-color: #248c86;
  padding: 5px 32px;
  text-align: center;
  margin: auto;
  border: none;
  float: left;
}
.btn_2 {
  color: rgb(0, 0, 0);
  background-color: #ffffff;
  padding: 5px 32px;
  text-align: center;
  margin: auto;
  border: none;
  float: right;
}

.btn {
    min-width: 250px;
}
</style>
