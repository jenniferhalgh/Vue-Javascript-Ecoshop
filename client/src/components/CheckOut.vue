<template>
<div>
    <div class="btn-groupd-flex" role="group">
   <router-link class="links" to="/checkout/shoppingCart">
  <button type="button" class="btn btn-secondary btn-arrow-right ml-1">Shopping cart</button>
  </router-link>
  <router-link class="links" to="/checkout/paymentMethod">
  <button type="button" class="btn btn-secondary btn-arrow-right ml-1">Payment method</button>
  </router-link>
  <button type="button" class="btn btn-secondary btn-arrow-right ml-1">Order summary</button>
</div>
</div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'checkout',
  mounted() {
    Api.get('/items').then(response => {
      this.items = response.data.items
    })
      .catch(error => {
        console.error(error)
      })
  },
  data() {
    return {
      items: [],
      showCartPage: false,
      showPaymentPage: false,
      showOrderSummary: false,
      showMyInfo: false
    }
  },
  methods: {
  }
}
</script>

<style>

.btn-arrow-right {
   position: relative;
   padding-left: 18px;
   padding-right: 18px;
}

.btn-arrow-right {
   padding-left: 36px;
}

.btn-arrow-right:before,
.btn-arrow-right:after {
   /* make two squares (before and after), looking similar to the button */
   content: "";
   position: absolute;
   top: 7px;
   /* move it down because of rounded corners */
   width: 22px;
   /* same as height */
   height: 22px;
   /* button_outer_height / sqrt(2) */
   background: inherit;
   /* use parent background */
   border: inherit;
   /* use parent border */
   border-left-color: transparent;
   /* hide left border */
   border-bottom-color: transparent;
   /* hide bottom border */
   border-radius: 0px 4px 0px 0px;
   /* round arrow corner, the shorthand property doesn't accept "inherit" so it is set to 4px */
   -webkit-border-radius: 0px 4px 0px 0px;
   -moz-border-radius: 0px 4px 0px 0px;
}

.btn-arrow-right:before,
.btn-arrow-right:after {
   transform: rotate(45deg);
   /* rotate right arrow squares 45 deg to point right */
   -webkit-transform: rotate(45deg);
   -moz-transform: rotate(45deg);
   -o-transform: rotate(45deg);
   -ms-transform: rotate(45deg);
}

.btn-arrow-right:before {
   /* align the "before" square to the left */
   left: -11px;
}

.btn-arrow-right:after{
   /* align the "after" square to the right */
   right: -11px;
}

.btn-arrow-right:after{
   /* bring arrow pointers to front */

   z-index: 1;
}

.btn-arrow-right:before{
   /* hide arrow tails background */

   background-color: white;
}
.btn-arrow-right {
   padding-left: 36px;
}

.btn-arrow-right{
   position: relative;
   padding-left: 18px;
   padding-right: 18px;
}
</style>
