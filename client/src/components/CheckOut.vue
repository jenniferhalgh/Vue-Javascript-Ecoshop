<template>
   <div>
   <ul class="nav ml-5">
     <li class="nav-item">
       <a class="nav-link" href="/checkout/shoppingCart"> Shopping Cart </a>
     </li>
   <li class="nav-item">
       <a class="nav-link" href="/checkout/paymentMethod">Payment method </a>
     </li>
   <li class="nav-item">
       <a class="nav-link" href="/checkout/order"> Order Summary</a>
     </li>
     </ul>
   </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'display',
  mounted() {
    const jwttoken = {
      token: sessionStorage.getItem('token')
    }
    let host = window.location.origin
    if (!host === 'https://group20-ecoshop.herokuapp.com/') {
      host = 'http://localhost:3000/'
    }
    fetch(`${host}/customer`, {
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
    }).catch(function (err) {
      console.log(err)
    })
  },
  data() {
    return {
      customer: {}
    }
  }

}
</script>
<style scoped>
       .green-text{
           text-align: center;
           font-weight: 100;
       }
       .nav-item{
         float: left;
       }

       .nav{
         flex-direction: row !important;
       }

   @media (min-device-width: 360px) and (max-device-height: 768px) {
   .nav{
     flex-direction: row !important;
   }
   .nav-item{
     font-size: 60%;
   }
   }

</style>
