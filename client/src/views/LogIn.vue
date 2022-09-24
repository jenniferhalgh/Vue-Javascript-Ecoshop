<template>
  <div>
    <b-button class="btn_1" variant="primary" v-on:click="signIn()" >Sign in</b-button>
    <b-button class="btn_2" variant="primary" v-on:click="signUp()" >Sign up</b-button>
    <div v-if="registeredUser">
        <sign-in />
        </div>
    <div v-else>
        <sign-up />
      </div>
  </div>
</template>

<script>

import signUp from '../components/signUp.vue'
import signIn from '../components/signIn.vue'

export default {
  name: 'LogIn',
  components: { signUp, signIn },
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
  background-color: #000000;
  text-align: center;
  margin: auto;
  border: none !important;
  float: left;
}
.btn_2 {
  color: white;
  background-color: #000000;
  text-align: center;
  margin: auto;
  border: none !important;
  float: right;
}
</style>
