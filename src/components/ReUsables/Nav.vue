<template>
     <header>
        <router-link to="/">
        <div class="logo">
            <div class="div">   
                <p>C</p>
            </div>
            <span>CARS</span>
        </div>
        </router-link>

        <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/product/167">Product details</router-link>
        <router-link to="/shoppingcart/">Shopping Cart</router-link>
        <router-link to="/wishlist">Wishlist</router-link>
        </nav>

        <div class="imgs">
            <img src="./../../images/search.svg" alt="search">
            <img src="./../../images/wishlist.svg" alt="wishlist">
            <img src="./../../images/cart.svg" alt="cart">
            <img src="./../../images/profile.svg" alt="profile">
        </div>
    </header>
</template>