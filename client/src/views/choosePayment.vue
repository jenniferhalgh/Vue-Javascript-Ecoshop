<template>

  <div>
  <checkout />
    <!-- PAYMENT OPTIONS -->
  <h4 class= "ml-5 mt-5">Payment options </h4>
  <div class="card-deck mt-4 ml-1">

    <!-- BUTTON CARD -->
    <div v-if="!hasChosen">
      <div class="card addPayment ml-5 border-0" style="width: 18rem;">
      <button class="btn addPayment btn-primary" :pressed="false" variant="success" onclick="document.getElementById('id1').style.display='block'">ADD NEW CARD</button>
</div>
    </div>

<!-- ALL CARDS -->
        <div v-for="payment in paymentInfos" v-bind:key="payment._id">
    <div class="card ml-5 mb-5" style="width: 18rem;">
      <div class="card-header">Card
        <!-- EDIT + DELETE BUTTON -->
        <button class="button-delete btn-primary ml-1" v-on:click="removeCard(payment)" style="width: auto">Delete</button>
        <button class="button-update btn-primary" onclick="document.getElementById('id2').style.display='block'" v-on:click="paymentId=payment._id" style="width: auto">Edit</button>
      </div>
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
        <router-link class="links" to="/checkout/order">
          <b-button type="button" class="complete-order" @click="location.reload()"> Complete order</b-button>
        </router-link>
  </div>
</div>
      </ul>
  </div>
  </div>
  </div>

  <!--ADD NEW CARD INPUTS-->
<div id="id1" class="modal">
      <form class="modal-contents" @submit.prevent="addPayment()">
        <div class="container">
          <div class="form-update">
            <span
              onclick="document.getElementById('id1').style.display='none'" class="close" title="Close Modal">&times;</span>
            <input type="text" class="form-control" v-model="nameOnCard" placeholder="Name on card" />
            <input type="text" class="form-control" v-model="cardNum" placeholder="Card number" />
            <input type="text" class="form-control" v-model="cvv" placeholder="cvv" />
            <button class="btn btn-primary btn-block">Add</button>
          </div>
        </div>
      </form>
    </div>

  <div id="id2" class="modal">
      <form class="modal-contents" @submit.prevent="edit()">
        <div class="container">
          <div class="form-update">
            <span
              onclick="document.getElementById('id2').style.display='none'" class="close" title="Close Modal">&times;</span>
            <input type="text" class="form-control" v-model="nameOnCard" placeholder="nameOnCard"/>
            <input type="text" class="form-control" v-model="cardNum" placeholder="Card number"/>
            <input type="number" class="form-control" v-model.lazy="cvv" placeholder="cvv"/>
            <button class="btn btn-primary btn-block">Update</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import checkout from '../components/CheckOut.vue'

export default {
  name: 'payment',
  components: { checkout },
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
      error: '',
      paymentId: ''
    }
  },
  methods: {
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
        this.paymentInfos.push(newCard)
        location.reload()
      }).catch(error => {
        this.error = error.response.data.error
        console.error(error)
        console.log(this.error)
        this.$bvModal.msgBoxOk(this.error)
      })
    },
    edit() {
      const updatedCard = {
        cardInfo: {
          nameOnCard: this.nameOnCard,
          cardNum: this.cardNum,
          cvv: this.cvv
        },
        customer: this.customer._id
      }
      console.log(this.paymentId)
      console.log(updatedCard)
      console.log(this.customer._id)
      Api.put(`/customers/${this.customer._id}/paymentInfos/${this.paymentId}`, updatedCard).then((res) => {
        console.log(res.data)
      },
      (err) => {
        console.log(err.response)
        this.boxOne = ''
        this.error = err.response.data.error
        this.$bvModal.msgBoxOk(this.error)
      }
      )
      Api.get(`/customers/${this.customer._id}/paymentInfos`).then(response => {
        console.log(response.data)
        this.paymentInfos = response.data
        location.reload()
      }).catch(error => {
        console.error(error)
      })
    },
    removeCard(payment) {
      Api.delete(`/customers/${this.customer._id}/paymentInfos/${payment._id}`).then(response => {
        console.log(response)
      }).catch(error => {
        console.error(error)
      })
      location.reload()
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

.button-update{
  float: right;
}

.button-delete{
  float: right;
}
.complete-order{
  width: 100%;
}
    </style>
