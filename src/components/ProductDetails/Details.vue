<script setup>

import { onMounted, ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import axios from 'axios';
import { GetData,SetData } from '@/script/localstore';

// vue notification toast
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const route = useRoute();
const router = useRouter();
const Details = ref({});
let isLoading = ref(true);
let ImagesArr = ref([]);
let InitialImage = ref('');
let quantity = ref(1);

const CartData = GetData('cart-list');
const WishlistData = GetData('wish-list');

onMounted(() => {
    let id = route.params.id;
    axios.get('https://dummyjson.com/products/' + id)
        .then(function (response) {
            Details.value = response.data;
            ImagesArr.value = response.data.images;
            InitialImage.value = ImagesArr.value[0];
            isLoading.value = false;
            console.log(Details.value);
            
        });
});

const DiscountPrice = () => {
        let initialprice = Details.value.price;
        let discountprice = Details.value.discountPercentage;

        let actualPrice = initialprice - initialprice*discountprice/100;
        return actualPrice.toFixed(2)
    }

const changeimg = (image) => { 
    InitialImage.value = image;
}

// product color
const ProductColors = ref([
        {
            id: 1,
            name: 'Brown',
            active: true,
        },
        {
            id: 2,
            name: 'Gray'
        },
        {
            id: 3,
            name: 'Light Green'
        },
        {
            id: 4,
            name: 'Maroon'
        },
        {
            id: 5,
            name: 'Blue'
        }
    ]);

    let colorvalue = ref(ProductColors.value[0].name);

        const SetColor = (color) =>{
            ProductColors.value.map(element => {
                if(element.id == color.id) element.active = true;
                else element.active = false;
            });

            colorvalue.value = color.name;
        }

        const addtoCart = () =>{
             
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

    const addtoWishlist = () => {

        let wishlistdata = {
            product: Details.value,
            color: colorvalue.value,
            price: DiscountPrice()
        }

        let wishlist_duplicate_check = false;
            WishlistData.map(element => {
                if(element.product.id == Details.value.id){
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

    <section class="full-details" v-if="!isLoading">
        
        <div class="container">

            <div class="images">
                <div class="top-image">
                    <div class="prev">
                        <img src="./../../images/prev.svg" alt="prev"  @click="InitialImage = ImagesArr[[ImagesArr.indexOf(InitialImage) - 1]]">
                    </div>
                    <div class="next">
                        <img src="./../../images/next.svg" alt="next"  @click="InitialImage = ImagesArr[[ImagesArr.indexOf(InitialImage) + 1]%ImagesArr.length]">
                    </div>
                    <img :src="InitialImage" alt="samsungs24ultra">
                </div>
                <div class="bottom-image">
                    <div class="img1" v-for="(image, index) in ImagesArr" :key="index" @click="changeimg(image)">
                        <img :src="image" :alt="image">
                    </div>
                </div>
            </div>

            <div class="preferences">
                <p>{{ Details.brand }}</p>

                <h2>{{ Details.title }}</h2>

                <div class="ratings">
                    <img src="./../../images/star.svg" v-for="star in Math.round(Details.rating)" alt="star">
                    <span>{{ Details.rating.toFixed(1) }}</span>
                    <p>({{ Details.reviews.length }} Review(s))</p>
                </div>

                <strong>

                    <p>${{ Details.price }}</p>
                    <p>${{ DiscountPrice() }}</p>

                </strong>

                <p>{{ Details.description }}</p>

                <div class="colors">
                    <span>Color:</span>
                    <div class="color">
                        <div :class="[`color${color.id}`,color.active ? 'active' : '']" 
                        v-for="color in ProductColors" 
                        :key="color.id" 
                        @click="SetColor(color)"
                        ></div>    
                    </div>
                </div>

                <p>*{{ Details.availabilityStatus }}*</p>

                <div class="quantity">
                    <div class="numbers">
                        <span @click="quantity--">-</span>
                        <input type="number" v-model="quantity">
                        <span @click="quantity++">+</span>
                    </div>
                </div>
                <div class="btns">
                    <button id="btn1" @click="addtoCart()">Add to Cart</button>
                    <button id="btn2">Buy Now</button>
                    <button id="btn3" @click="addtoWishlist()">Wishlist</button>
                </div>

                <p>- {{ Details.returnPolicy }}</p>
                <p>- {{ Details.shippingInformation }}</p>
                <p>- {{ Details.warrantyInformation }}</p>
            </div>  
        </div>        
    </section>

    <div class="reviews" v-if="!isLoading" v-for="reviews in Details.reviews" :key="reviews">
        <h2>{{ reviews.reviewerName }}:</h2>
        <p>{{ reviews.reviewerEmail }}</p>
        <strong style="color: blue;">"{{ reviews.comment }}"</strong>

        <div class="star">
            <p>rating: {{ reviews.rating }}</p>
            <img src="./../../images/star.svg" v-for="star in Math.round(reviews.rating)" alt="star">
        </div>

        <p style="position: absolute; top: 10%; right: 3%;" >({{ reviews.date }})</p>
    </div>

    <div v-else class="loader">
            <img src="./../../images/loading.gif" alt="">
        </div>
</template>