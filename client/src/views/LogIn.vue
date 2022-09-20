<template>
  <div>
    <b-button class="btn_1" variant="primary" v-on:click="signIn()" >Sign in</b-button>
    <b-button class="btn_2" variant="primary" v-on:click="signUp()" >Sign up</b-button>
    <div v-if="registeredUser">

        </div>
    <div v-else>
        <sign-up />
      </div>
  </div>
</template>

<script>

import signUp from '../components/signUp.vue'

export default {
  name: 'LogIn',
  components: { signUp },
  data() {
    return {
      registeredUser: false
    }
  },
  methods: {
    signIn() {
      this.registeredUser = true
    },
    signUp() {
      this.registeredUser = false
    }
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
  color: white;
  background-color: #35a6be;
  padding: 5px 32px;
  text-align: center;
  margin: auto;
  border: none;
  float: right;
}
</style>
