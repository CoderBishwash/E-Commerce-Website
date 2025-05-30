<script setup>
import { ref } from 'vue';
import { GetData,SetData } from '@/script/localstore';

const CartData = ref(GetData('cart-list')); 

const decrease = (data) =>{
    if(data.quantity > 1) {
        data.quantity -=1;
        SetData('cart-list',CartData.value);
    }
}

const increase = (data) =>{
    if(data.product.stock > data.quantity) {
        data.quantity +=1;
        SetData('cart-list',CartData.value);
    }
}

const removedata = (data, dataindex) => {
    CartData.value = CartData.value.filter((element,index) => {
        if(index == dataindex) return false;
        else return true;
    });
    SetData('cart-list',CartData.value);
}

const totalItems = () => {
    let totalitems = 0;
    CartData.value.map(element => {
        totalitems += element.quantity;
    });
    return totalitems;
}
const calculatesubTotal = () => {
    let subtotal = 0;
    CartData.value.map(element => {
        subtotal += element.price * element.quantity;
    });

    return subtotal;
}
</script>
<template>
    <div class="shop-products-section">
        <div class="product-detail">
            <div class="product-detail-heading">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
            </div>
            <ul>
                <li v-for="(data,index) in CartData" :key="index">
                    <span><img src="./../../images/close.svg" alt="" @click="removedata(data,index)"></span>
                    <div class="image">
                        <img :src="data.product.thumbnail" alt="">
                    </div>
                    <div class="product">
                        <h6>{{ data.product.title }}</h6>
                        <p>Color : {{ data.color }}</p>
                    </div>
                    <div class="qty">
                        <p>${{ data.price }}</p>
                    </div>
                    <div class="btn">
                        <img src="./../../images/sub.svg" alt="" @click="decrease(data)">
                        <div class="box">
                            <p>{{ data.quantity }}</p>
                        </div>
                        <img src="./../../images/add.svg" alt="" @click="increase(data)">
                    </div>
                    <div class="ttl">
                        <p>${{ (data.price * data.quantity).toFixed(2) }}</p>
                    </div>  
                </li>

                <div class="empty" v-if="CartData.length == 0">
                    <p style="text-align: center; margin: 20px; font-size: 30px;">Your Cart List is empty</p>
                </div>
                
            </ul>
            <div class="actions">
                <div class="coupon">
                    <input type="text" placeholder="Coupon Code">
                    <button>apply coupon</button>
                </div>
                <div class="clearCart">
                    <p>clear shopping cart</p>
                </div>
            </div>
        </div>
        <div class="product-summary">
            <h6>Order Summary</h6>
            <div class="items">
                <ul>
                    <li>
                        <span>Items</span>
                        <p>{{ totalItems() }}</p>
                    </li>
                    <li>
                        <span>Sub Total</span>
                        <p>${{ calculatesubTotal() }}</p>
                    </li>
                    <li>
                        <span>Shipping</span>
                        <p>$00.00</p>
                    </li>
                    <li>
                        <span>Taxes</span>
                        <p>$00.00</p>
                    </li>
                    <li>
                        <span>Coupon Discount</span>
                        <p>$00.00</p>
                    </li>
                    <li>
                        <span>Total</span>
                        <p>${{ calculatesubTotal() }}</p>
                    </li>
                </ul>
            </div>
            <div class="btn">
                <p>Proceed to Checkout</p>
            </div>

        </div>
    </div>
</template>