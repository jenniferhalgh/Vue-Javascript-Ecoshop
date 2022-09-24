<template>
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
<items/>
</div>
</template>
<script>

import items from '../components/getItem.vue'

export default {
  name: 'catalogue',
  components: { items },
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
