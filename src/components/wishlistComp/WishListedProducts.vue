<script setup>

import { ref } from 'vue';
import { SetData,GetData } from '@/script/localstore';

const WishListData = ref(GetData('wish-list'));

let date = new Date();
let monthindex = date.getDate();
let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let fullyear = date.getFullYear();
let fulldate = monthindex+ " " + months[monthindex] + "," + fullyear;

const removedata = (data, dataindex) => {
    WishListData.value = WishListData.value.filter((element,index) => {
        if(index == dataindex) return false;
        else return true;
    });
    SetData('wish-list',WishListData.value);
}

const addtoCart = (data) => {
    let cartdata = {
                product: Details.value,
                color: colorvalue.value,
                quantity: quantity.value,
                price: DiscountPrice()
            }

            let duplicatecheck = false;
            CartData.map(element => {
                if(element.product.id == Details.value.id){
                    element.quantity += quantity.value;
                    duplicatecheck = true;
                }
                return true;
            });

           if(!duplicatecheck) CartData.push(cartdata);

            SetData('cart-list',CartData);

            router.push({
                path: '/shoppingcart/'
            })
}

</script>

<template>

<div class="wishlist-product-section">
        <div class="wproduct-detail-heading">
            <span>Product</span>
            <span>Price</span>
            <span>Date Added</span>
            <span>Stock Status</span>
        </div>
        <ul>
            <li v-for="(data,index) in WishListData" :key="index">
                <img src="./../../images/close.svg" alt="" @click="removedata(data,index)">
                <div class="wimage">
                    <img :src="data.product.thumbnail" alt="">
                </div>
                <div class="wproduct">
                    <h6>{{ data.product.title }}</h6>
                    <p>Color : {{ data.color }}</p>
                </div>
                <p>${{ data.price }}</p>
                <p>{{ fulldate || data.date }}</p>
                <div class="inStock">
                    <p>{{ data.product.availabilityStatus }}</p>
                </div>
                <div class="button" @click="addtoCart(data)">
                    <p>Add to Cart</p>
                </div>
            </li>
             <div class="empty" v-if="WishListData.length == 0">
                    <p style="text-align: center; margin: 20px; font-size: 30px;">Your Wish List is empty</p>
                </div>
        </ul>
        <div class="wishlist-link-section">
            <div class="wishlist-links">
                <p>Wishlist link:</p>
                <input type="text" placeholder="https://www.example.com">
                <button>Copy</button>
            </div>
            <div class="wishlist-cart">
                <p>Clear Wishlist</p>
                <button>Add All to Cart</button>
            </div>
        </div>

     </div>
</template>