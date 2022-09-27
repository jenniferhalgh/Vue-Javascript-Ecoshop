<template>

  <div>
    <!-- MY INFORMATION -->
    <ul class="list-group my-info mt-5 ml-5">
      <h4 class="list-group-item">My information</h4>
      <li class="list-group-item">First name: {{customer.name.firstname}}</li>
      <li class="list-group-item">Last name: {{customer.name.lastname}}</li>
      <li class="list-group-item">Personal number: {{customer.personalNumber}}</li>
      <li class="list-group-item">Phone number: {{customer.phone}}</li>
    </ul>

    <!-- PAYMENT OPTIONS -->
  <h4 class= "ml-5 mt-5">Payment options </h4>
  <div class="card-deck mt-4 ml-1">

    <!-- BUTTON CARD -->
    <div v-if="!hasChosen">
      <div class="card addPayment ml-5 border-0" style="width: 18rem;">
      <button class="btn addPayment btn-primary" :pressed="false" variant="success" v-on:click="hasChosen=true, addNewPayment=true">ADD NEW CARD</button>
</div>
    </div>

<!-- ALL CARDS -->
        <div v-for="payment in paymentInfos" v-bind:key="payment._id">
    <div class="card ml-5 mb-5" style="width: 18rem;">
      <div class="card-header">Card</div>
      <ul class="list-group payment list-group-flush">
        <div>
          <li class="list-group-item">Name on card: {{payment.cardInfo.nameOnCard}}</li>
          <li class="list-group-item">Card number: {{payment.cardInfo.cardNum}}</li>
          <li class="list-group-item">cvv: {{payment.cardInfo.cvv}}</li>
      <div v-if="!hasChosen">
          <b-button href="#" class="btn choose btn-primary" :pressed="false" variant="success" v-on:click="chosenOption(payment) ">Choose</b-button>
      </div>
      <div v-else>
        <div class="card-header">CHOSEN</div>
      </div>
          </div>
      </ul>
  </div>
  </div>

  <!--ADD NEW CARD INPUTS-->
  <div v-if="addNewPayment">
    <h6 class="ml-5"> Add new card: </h6>
<form class="ml-5 form" @submit.prevent="addPayment">
        <div>
        <input type="text" class="form-control" v-model="nameOnCard" placeholder="Name on card" />
        </div>
        <div>
        <input type="text" class="form-control" v-model="cardNum" placeholder="Card number" />
        </div>
        <div>
        <input type="text" class="form-control" v-model="cvv" placeholder="cvv" />
        </div>
        <button type="submit" class="btn btn-primary" v-on:click="addNewPayment=false, addPayment()">Add</button>
    </form>
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
      paymentInfos: [],
      chosenPayment: [],
      hasChosen: false,
      addNewPayment: false,
      nameOnCard: '',
      cardNum: '',
      cvv: '',
      error: ''
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
    },
    chosenOption(payment) {
      this.hasChosen = true
      Api.get(`/customers/${this.customer._id}/paymentInfos/${payment._id}`).then((res) => {
        this.paymentInfos = []
        this.paymentInfos.push(res.data[0])
        console.log(this.paymentInfos)
      },
      (err) => {
        console.log(err.response)
        this.boxOne = ''
        this.error = err.response.data.error
        this.$bvModal.msgBoxOk(this.error)
      }
      )
    },
    addPayment() {
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
        const newCard = {
          cardInfo: {
            nameOnCard: this.nameOnCard,
            cardNum: this.cardNum,
            cvv: this.cvv
          },
          customer: this.customer._id
        }
        Api.post(`/customers/${this.customer._id}/paymentInfos`, newCard).then(response => {
          console.log(response.data)
          this.paymentInfos = []
          this.paymentInfos.push(newCard)
          this.hasChosen = true
          this.$bvModal.msgBoxOk('New card added')
        })
      }).catch(error => {
        console.error(error)
        this.$bvModal.msgBoxOk(this.error)
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

    .card-header{
      justify-content: center;
    }
.addPayment{
  height: 100%;
  margin-bottom: 17%;
}

.form{
  width: 50%;
}
    </style>
