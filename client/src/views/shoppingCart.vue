<template>
    <div>
        <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
            <p style="color:#99ae71; font-size: 40px">SHOPPING CART </p>
        </div>
        <div v-if="itemsInCart">
            <div class="row">
                <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                    <ul class="list-group">
                        <div v-for="item in shoppingCart" v-bind:key="item._id">
                            <li class="list-groun-item">
                                <span class="badge"> {{this.quantitiyOfItems}}</span>
                                <strong> {{this.item.name}}</strong>
                                <span class="label label-sucess"> {{this.item.price}}</span>
                                <div class="btn-group">
                                    <button class="btn btn-primary btn-xs dropdown-toggle" type="button">Action <span class="caret"></span> </button>
                                    <ul class="dropdown-menu">
                                        <li> <a href="#">Reduce by 1</a></li>
                                        <li> <a href="#">Remove all</a></li>
                                    </ul>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                    <strong>{{this.totalPrice}} </strong>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                    <button type="button" class="btn btn-successs">Checkout</button>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="col-sm-6 col-md-6 col-md-offset-3 col-sm-offset-3">
                <p>No Items in Cart</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Shopping Cart',
  components: { },
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
.p{
    text-align: right;
}
</style>
