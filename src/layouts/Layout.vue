<template>
  <div class="w-full h-screen bg-opacity-90 grid"
    style="grid-template-rows:52px auto; text-shadow: 1px 1px #2c2c2c; background:#0f0f12">
    <header class="header text-gray-600 font-medium text-lg sticky top-0 z-10" style="background:#0f0f12">
      <nav
        class="nav grid grid-flow-col auto-cols-fr text-center max-w-3xl m-auto justify-center items-center h-full pr-10">
        <!-- <g-link
          class="nav__link mr-3 p-3 hover:border-gray-600 border-transparent border-b-4 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25"
          exact-active-class="border-gray-600 text-gray-400" to="/"> <font-awesome :icon="['fas', 'house']" />
          HOME</g-link> -->
        <router-link
          class="nav__link p-2 flex items-center justify-center  md:p-3 hover:border-gray-600 border-transparent border-b-4 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25"
          exact-active-class="border-gray-600  text-gray-400 " to="/"> <mdi-plus />
          BUILD PLANNER</router-link>
        <router-link
          class="nav__link flex items-center justify-center md:mr-3 mr-2 p-2 md:p-3 hover:border-gray-600 border-transparent border-b-4 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25"
          exact-active-class="border-gray-600 text-gray-400" to="/builds"> <mdi-account />
          MY BUILDS</router-link>

      </nav>
      <div v-show="!user" ref="signin_ref" class="absolute right-5 top-3 cursor-pointer">
      </div>
      <div v-show="user" class="absolute right-5 top-3 cursor-pointer rounded-full w-8 h-8 overflow-hidden">
        <img :src="user?.picture" />
      </div>
    </header>
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import { jwtDecode } from "jwt-decode";

const signin_ref = ref(null);
const user = ref(null);

var renderGoogleSigninButton = function () {
  google.accounts.id.initialize({
    client_id: '198301617155-f2jb82g7ibfro25gtpk2iivssoscva0g.apps.googleusercontent.com',
    callback: function (user_profile) {
      if (user_profile?.credential) {
        window.localStorage.setItem('credential', user_profile?.credential);
        user.value = jwtDecode(user_profile?.credential);
      }
    }
  });
  google.accounts.id.renderButton(signin_ref.value, { theme: "filled_black", shape: "circle", size: 'medium', type: 'icon' })
};


onMounted(() => {
  const credential = typeof window !== "undefined" ? window?.localStorage?.getItem('credential') : null;
  if (credential) {
    user.value = jwtDecode(credential)
  }
  window.addEventListener('load', renderGoogleSigninButton);
  renderGoogleSigninButton();
})
</script>


