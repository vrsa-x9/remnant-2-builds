<template>
  <div class="w-full h-screen bg-opacity-90 grid"
    style="grid-template-rows:52px auto; text-shadow: 1px 1px #2c2c2c; background:#0f0f12">
    <header class="header text-gray-600 font-medium text-lg">
      <nav class="nav grid grid-flow-col auto-cols-fr text-center max-w-3xl m-auto justify-center items-center h-full">
        <g-link
          class="nav__link mr-3 p-3 hover:border-gray-600 border-transparent border-b-4 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25"
          exact-active-class="border-gray-600 text-gray-400" to="/"> <font-awesome :icon="['fas', 'house']" />
          HOME</g-link>
        <g-link
          class="nav__link mr-3 p-3 hover:border-gray-600 border-transparent border-b-4 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25"
          exact-active-class="border-gray-600 text-gray-400" to="/builds"> <font-awesome :icon="['fas', 'list']" />
          MY BUILDS</g-link>
        <g-link
          class="nav__link  p-3 hover:border-gray-600 border-transparent border-b-4 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25"
          exact-active-class="border-gray-600  text-gray-400 " to="/planner"> <font-awesome :icon="['fas', 'plus']" />
          BUILD PLANNER</g-link>
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
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://oztxoqanibwswcpcqfnp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dHhvcWFuaWJ3c3djcGNxZm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwMDE2OTIsImV4cCI6MjAxODU3NzY5Mn0.2PUUL4_8WYW-OOXNk_7kvF399IF65r52e-QmZtU0xbI')
provide('supabase', supabase);


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

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

