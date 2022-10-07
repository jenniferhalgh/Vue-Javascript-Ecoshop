<template>
<div>
  <ul class="nav flex-column ml-5">
  <li class="nav-item">
    <a class="nav-link" href="/profile/personalInformation">My information</a>
  </li>
  <div v-if="customer.email !='admin@gmail.com'">
  <li class="nav-item">
    <a class="nav-link" href="/profile/paymentInfos">Payment methods</a>
  </li>
  <br>
  <li class="nav-item">
    <a class="nav-link" href="/profile/orders">Orders</a>
  </li>
</div>
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
    </style>
