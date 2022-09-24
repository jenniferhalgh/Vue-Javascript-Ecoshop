<template>
  <div>
    <form @submit.prevent="handleSubmit">
        <h6> Sign in </h6>
        <div>
        <input type="text" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <div>
        <input type="text" class="form-control" v-model="password" placeholder="Password" />
        </div>
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
        console.log(res)
        sessionStorage.setItem('token', res.data.token)
        this.$bvModal.msgBoxOk('Successfully logged in')
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
h6{
  color: aqua;
}
</style>
