<template>
  <div>
    <div><getDropdownCart class="shopping-cart" /></div>
    <div class="container">
      <img id="landing" class="center" src="@/assets/shopping.jpeg" alt="Shopping" style="width:100%;height:60%;">
    <div class="heading">
      <h2>
        SHOPPING WITH SUSTAINABILITY </h2>
        <p>HASN'T BEEN EASIER</p>
    </div>
    </div>
    <div class="info" >
      <h2>Who are we?</h2>
      <p> ECOSHOP is an online mall where you can buy everything in one go with one shopping cart. Ecoshop caters to your needs by having everything in one website. Ecoshop allows you to shop vegan and also support small creators locally </p>
    </div>
 <div class= "parent">
        <div class="child">
            <img class="img-blur" src="@/assets/catalogue.jpeg" alt="catalogue">
            <h2 class="centered">CATALOGUE</h2>
            <button class="btn" v-on:click="myFunction()">See More</button>
          </div>
          <div class="child">
            <img class="img-blur" src="@/assets/profile.jpg" alt="profile">
            <h2 class="centered">Profile</h2>
            <button class="btn" v-on:click="myFunction1()">See More</button>
        </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import getDropdownCart from '../components/getDropdownCart.vue'

export default {
  name: 'home',
  components: { getDropdownCart },
  props: {
    customer: Object
  },
  mounted() {

  },
  data() {
    return {

    }
  },
  methods: {
    myFunction() {
      location.replace('http://localhost:8080/catalogue')
    },
    myFunction1() {
      location.replace('http://localhost:8080/profile')
    }
  }
}
</script>

<style>
img{
  max-height: 100%;
}
#landing{
  width: 200px;
  height: 300px;
  object-fit: cover;
    margin-top: 50px;
    display: block;
}
.info{
  padding: 70px;
  text-align: center;
}

/* Container holding the image and the text */
.container {
  position:relative;
  text-align: center;
  color: white;
  object-fit: cover;
  width: 100% !important;
  height: 100%;
  margin: auto !important
}

/* Bottom left text */
.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 16px;
}

/* Top left text */
.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
  color:black
}

/* Top right text */
.shopping-cart {
  margin-top: 10px;
}

/* Bottom right text */
.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}

/* Centered text */
.heading {
  position: absolute;
  top: 40%;
  left: 70%;
  transform: translate(-50%, -50%);
  font-family: "copperplate";
  font-size: 2vw
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "copperplate";
  color: rgb(65, 59, 59);
}

.center{
  display: block;
  margin-left: auto;
  width: 1500px;
  height: 700px;
  opacity: 0.8;

}
h2, p{
  text-align-last: center;
  font-family: "copperplate" !important;
}
.parent{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.child{
  display:flex;
    flex-basis: 50%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
}
.child img{
   width: 100%;
}
.child .btn{
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: rgb(161, 165, 126) !important;;
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: auto !important;
}
.img-blur{
  opacity: 0.4;
  max-height: 400px;
}

@media (min-device-width: 360px) and (max-device-height: 900px) {
  img{
    width: 90%;
  }
  .heading{
    font-size: 2vw !important;
  }
  h2{
    font-size: 3vw !important;
  }
  .child.btn{
    font-size: 70%!important;
  }
  .centered{
    font-size: 4vw;
    top: 40%
  }
}

</style>
