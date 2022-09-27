<template>
  <div>
    <form @submit.prevent="handleSubmit">
        <h1> Sign up </h1>
        <router-link class="links ml-5" to="/signIn">
        <button type="button" class="btn">Sign In</button>
      </router-link>
        <div>
        <input type="text" class="form-control" v-model="firstname" placeholder="First name" />
        </div>
        <br>
        <div>
        <input type="text" class="form-control" v-model="lastname" placeholder="Last name" />
        </div>
        <br>
        <div>
        <input type="username" class="form-control" v-model="username" placeholder="Username" />
        </div>
        <br>
        <div>
        <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>
        <br>
        <div>
        <input type="text" class="form-control" v-model="personalNumber" placeholder="Personal number" />
        </div>
        <br>
        <div>
        <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <br>
        <div>
        <input type="text" class="form-control" v-model="phone" placeholder="Phone number" />
        </div>
        <br>
        <div>
        <input type="text" class="form-control" v-model="address" placeholder="Address" />
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
  name: 'signUp',
  components: { },
  data() {
    return {
      customerData: {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        personalNumber: '',
        email: '',
        phone: '',
        adress: '',
        shoppingCart: null,
        paymentInfos: [],
        orders: [],
        token: '',
        error: ''
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
        shoppingCart: this.shoppingCart,
        paymentInfo: [],
        orders: [],
        token: ''
      }
      Api.post('/customers', newCustomer).then((res) => {
        console.log(res)
        this.$router.push('/signIn')
        sessionStorage.setItem('token', res.data.token)
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
b-button{
  background: #99ae71 !important;
  border: none !important;
}
h1{
  text-align: center;
}
</style>
