<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import ProductCard from './ProductCard.vue';

let Products = ref([]);
let isLoading = ref(true);


onMounted(() => {
    axios.get('https://dummyjson.com/products/category/vehicle')
        .then(function (response) {
            Products.value = response.data.products;
            isLoading.value = false;
        });
});

</script>

<template>


<section class="products">
        <ul v-if="!isLoading" >

            <ProductCard
            v-for="products in Products" :key="products.id"
            :products="products"
            />

        </ul>

        <div v-else class="loader">
            <img src="./../../images/loading.gif" alt="">
        </div>
    </section>
</template>