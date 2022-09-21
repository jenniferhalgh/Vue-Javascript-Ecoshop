<template>
  <div>
    <form @submit.prevent="handleSubmit">
        <h1> Sign up </h1>
        <div>
        <input type="text" class="form-control" v-model="firstname" placeholder="First name" />
        </div>
        <div>
        <input type="text" class="form-control" v-model="lastname" placeholder="Last name" />
        </div>
        <div>
        <input type="text" class="form-control" v-model="username" placeholder="Username" />
        </div>
        <div>
        <input type="text" class="form-control" v-model="password" placeholder="Password" />
        </div>
        <div>
        <input type="text" class="form-control" v-model="personalNumber" placeholder="Personal number" />
        </div>
        <div>
        <input type="text" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <div>
        <input type="text" class="form-control" v-model="phone" placeholder="Phone number" />
        </div>
        <div>
        <input type="text" class="form-control" v-model="adress" placeholder="Adress" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'signUp',
  data() {
    return {
      customerData: {
        firstname: ' ',
        lastname: ' ',
        username: ' ',
        password: ' ',
        personalNumber: ' ',
        email: ' ',
        phone: ' ',
        adress: ' ',
        shoppingCart: null,
        paymentInfos: [],
        orders: [],
        error: ' '
      }
    }
  },
  methods: {
    handleSubmit() {
      const newCustomer = {
        name: {
          firstname: this.firstname,
          lastname: this.lastname
        },
        account: {
          username: this.username,
          password: this.password
        },
        email: this.email,
        phone: this.phone,
        personalNumber: this.personalNumber,
        adress: this.adress,
        shoppingCart: null,
        paymentInfo: [],
        orders: []
      }
      Api.post('/customers', newCustomer).then((res) => {
        console.log(res)
        this.$bvModal.msgBoxOk('SignUp Successful', this.$router.go(0))
      },
      (err) => {
        console.log(err.response)
        this.boxOne = ''
        this.error = err.response.data.error
        this.$bvModal.msgBoxOk(this.error)
      }
      )
    }
  }
}
</script>

<style>

</style>
