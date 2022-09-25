<template>
  <div id="app">
    <div class="header">
      <h1>ecoshop</h1>
    </div>
    <div id="nav">
      <router-link class= "links" to="/">Home </router-link>
      <router-link class= "links" to="/login">  Log in </router-link>
      <router-link class= "links" to="/customers">Customers </router-link>
      <router-link class= "links" to="/catalogue"> Catalogue</router-link>
      <router-link class="links" to="/profile"> Profile</router-link>
    <router-view/>
  </div>
  </div>
</template>

<style>
.app {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: left;
  color: #99ae71;
  background-color: antiquewhite;
}
.header{
  text-align: center;
  color: #99ae71;
  font-size: 50px;
  background-color: rgb(251, 230, 203);
}
.links{
  color: #888888;
}
.router-link-exact-active{
  color: #000;
}

</style>
