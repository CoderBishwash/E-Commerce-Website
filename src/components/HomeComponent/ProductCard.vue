<script setup>
import router from '@/router';
import { ref } from 'vue';
import { GetData,SetData } from '@/script/localstore';

// vue notification toast
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';


const props = defineProps({
    products: {
        type: Object,
        default: {}
    }
});

  const DiscountPrice = () => {
        let initialprice = props.products.price;
        let discountprice = props.products.discountPercentage;

        let actualPrice = initialprice - initialprice*discountprice/100;
        return actualPrice.toFixed(2)
    }

    const ProdDetails = () => {
        router.push({
            path: '/product/' + props.products.id,
        }); 
    }

    const addtoWishlist = () => {

    const WishlistData = GetData('wish-list');

    let date = new Date();
    let monthindex = date.getDate();
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let fullyear = date.getFullYear();
    let fulldate = monthindex+ " " + months[monthindex] + "," + fullyear;

    let wishlistdata = {
            product: props.products,
            color: 'Black',
            price: DiscountPrice(),
            date: fulldate
        }

        let wishlist_duplicate_check = false;
            WishlistData.map(element => {
                if(element.product.id == props.products.id){
                    // show notification
                        const toast = useToast();
                                toast.error('Already Added', {
                                position: 'top',
                            });
                    wishlist_duplicate_check = true;
                }
                return true;
            });


        if(!wishlist_duplicate_check) {
        
        WishlistData.push(wishlistdata);

        SetData('wish-list',WishlistData);

        // show notification
      const toast = useToast();
            toast.success('Added to WishList', {
            position: 'top',
        });
        }
}
</script>

<template>
        <li>

                <div class="images">
                    <img src="./../../images/wishlist.svg" alt="wishlist"  @click="addtoWishlist()">
                    <img src="./../../images/expand.svg" alt="expand">
                    <img src="./../../images/cart.svg" alt="cart">
                </div>
                <div class="spa">
                <span>{{ Math.round(products.discountPercentage) }}% OFF</span>
                </div>

                <img  @click="ProdDetails" :src="products.thumbnail" alt="1">

                <div class="ratings">
                    <p>{{ products.brand }}</p>
                    <div class="star">
                        <img src="./../../images/star.svg" alt="star">
                        <span>{{ products.rating.toFixed(1) }}</span>
                    </div>
                </div>
                    <h3  @click="ProdDetails" >{{ products.title }}</h3>

                    <strong>

                        <p>${{ products.price }}</p>
                        <p>${{ DiscountPrice() }}</p>

                    </strong>

        </li>


</template>