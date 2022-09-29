<template>
  <div class="container-fluid">
  <div class="row">
    <div>
      <profileNav/>
    </div>
    <div class="col ml-5">
        <getOrder/>
    </div>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import profileNav from '../components/profileNav.vue'
import getOrder from '../components/getOrder.vue'

export default {
  name: 'orders',
  components: { profileNav, getOrder },
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
  },
  methods: {
  }
}
</script>

<style>
.green-text{
        text-align: center;
        font-weight: 100;
    }

</style>
