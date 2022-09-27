<template>
  <div>
    <ul class="list-group my-info mt-5 ml-5">
  <h4 class="list-group-item">My information</h4>
  <li class="list-group-item">First name: {{customer.name.firstname}}</li>
  <li class="list-group-item">Last name: {{customer.name.lastname}}</li>
  <li class="list-group-item">Personal number: {{customer.personalNumber}}</li>
  <li class="list-group-item">Phone number: {{customer.phone}}</li>
</ul>
<h4 class= "ml-5 mt-5">Payment options</h4>
<div class="card-deck mt-4 ml-1">
    <div v-for="payment in paymentInfos" v-bind:key="payment._id">
    <div class="card ml-5" style="width: 18rem;">
  <div class="card-header">
    Card
  </div>
  <ul class="list-group payment list-group-flush">
    <div>
      <li class="list-group-item">Name on card: {{payment.cardInfo.nameOnCard}}</li>
      <li class="list-group-item">Card number: {{payment.cardInfo.cardNum}}</li>
      <li class="list-group-item">cvv: {{payment.cardInfo.cvv}}</li>
      <a href="#" class="btn choose btn-primary">Choose</a>
      </div>
  </ul>
</div>
  </div>
  </div>
  </div>

</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'payment',
  components: { },
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
      return response.json()
    }).then((responseData) => {
      this.customer = responseData
      const vm = this
      Api.get(`/customers/${this.customer._id}/paymentInfos`).then(response => {
        console.log(response.data)
        vm.paymentInfos = response.data
      })
    }).catch(error => {
      console.error(error)
    })
  },
  data() {
    return {
      customer: {},
      itemNames: [],
      paymentInfos: [],
      itemsInCart: false
    }
  },
  methods: {
    removeFromCart(item) {
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
        return response.json()
      }).then((responseData) => {
        this.customer = responseData._id
        Api.delete(`/customers/${this.customer}/shoppingCart/${item}`).then((res) => {
          this.$bvModal.msgBoxOk('Removed from cart!')
        },
        (err) => {
          console.log(err.response)
          this.boxOne = ''
          this.error = err.response.data.error
          this.$bvModal.msgBoxOk(this.error)
        }
        )
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

    <style>
    .p{
    text-align: right;
    }
    .a{
    background: #99ae71 !important;
    }

    .payment{
      width: 100%;
    }

    .my-info{
      width: 50%;
    }

 .choose{
      width: 100%;
    }

    </style>
