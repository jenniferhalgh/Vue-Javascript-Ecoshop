<template>
    <div class="text">
          <div style="display: flex">
            <p class="attribute">First Name:</p>
            <p>{{ customer.name.firstname }}</p>
          </div>
          <div style="display: flex">
            <p class="attribute">Email:</p>
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
