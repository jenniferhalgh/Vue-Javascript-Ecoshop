<template>
  <div>
    <div class="container">
      <img id="landing" class="center" src="@/assets/shopping.jpeg" alt="Shopping" style="width:100%;height:60%;">
      <div><getDropdownCart class="top-right" /></div>
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
            <router-link class= "nav-link" to="/catalogue" @click="location.reload()"><button class="btn">See More</button></router-link>
          </div>
          <div class="child">
            <img class="img-blur" src="@/assets/profile.jpg" alt="profile">
            <h2 class="centered">Profile</h2>
            <b-nav-item class="nav-link" to="/profile" @click="location.reload()"><button class="btn">See More</button></b-nav-item>
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
    margin: auto;

    display: block;
}
.info{
  padding: 70px;
}
.delete-button {
 margin-top: 10px;
}
/* Container holding the image and the text */
.container {
  position:relative;
  text-align: center;
  color: white;
  object-fit: cover;
  width: 100%;
  height: 100%;
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
.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
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
}
.img-blur{
  opacity: 0.4;
  max-height: 400px;
}

* {
  box-sizing: border-box;
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
    font-size: 10px !important
  }
  .centered{
    font-size: 4vw;
    top: 40%
  }
}

</style>
