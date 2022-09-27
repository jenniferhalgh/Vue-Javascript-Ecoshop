<template>
  <div>
    <form @submit.prevent="handleSubmit">
        <h1> Sign in </h1>
        <div>
        <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <br>
        <div>
        <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'signIn',
  data() {
    return {
      customerData: {
        email: ' ',
        password: ' ',
        _id: '',
        error: ' '
      }
    }
  },
  methods: {
    handleSubmit() {
      const customer = {
        email: this.email,
        password: this.password
      }
      Api.post('/customers/login', customer).then((res) => {
        sessionStorage.setItem('token', res.data.token)
        this.$bvModal.msgBoxOk('Successfully logged in')
        this.$router.push('/')
        location.reload()
      },
      (err) => {
        console.log(err.response)
        this.boxOne = ''
        this.error = err.response.data.error
        this.$bvModal.msgBoxOk(this.error)
      })
    }
  }
}

</script>

<style>
button{
  background: #99ae71 !important;
  border: none !important;
}
h1{
  text-align: center;
}
</style>
