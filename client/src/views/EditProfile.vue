<template>
  <div>
  <form @submit.prevent="handleSubmit">
      <h1> Edit profile </h1>
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
  name: 'edit-profile',
  mounted() {
    const jwttoken = {
      token: sessionStorage.getItem('token')
    }
    fetch('http://localhost:3000/customer', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Host: '',
        token: jwttoken.token
      }
    }).then((response) => {
      if (response.status === 401) {
        this.$bvModal.msgBoxOk('Unauthorized. Please log in again')
        sessionStorage.setItem('token', null)
        this.$router.push('/signIn')
      } else {
        return response.json()
      }
    }).then((responseData) => {
      this.customer = responseData
    }).catch(error => {
      console.error(error)
    })
  },
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
        adress: ''
      },
      customer: {}
    }
  },
  methods: {
    handleSubmit() {
      const updateCustomer = {
        name: {
          firstname: this.firstname || this.customer.name.firstname,
          lastname: this.lastname || this.customer.name.lastname
        },
        account: {
          username: this.username || this.customer.account.username,
          password: this.password || this.customer.account.password
        },
        email: this.email || this.customer.email,
        phone: this.phone || this.customer.phone,
        personalNumber: this.personalNumber || this.customer.personalNumber,
        adress: this.adress || this.customer.adress
      }
      Api.put(`/customers/${this.customer._id}`, updateCustomer).then(
        res => {
          console.log(res)
          this.$router.push('/profile')
          this.$bvModal.msgBoxOk('Account updated.')
          location.reload()
        },
        (err) => {
          console.log(err.response)
        }
      ).catch(error => {
        console.error(error)
      })
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
