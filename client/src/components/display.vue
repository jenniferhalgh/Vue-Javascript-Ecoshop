<template>
    <div class="text">
          <div style="text-align:center">
            <h3> {{customer.name.firstname}} {{customer.name.lastname}}</h3>
          </div>
          <div class="green-text">
            <p>{{ customer.email }}</p>
          </div>
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
      return response.json()
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
    </style>
