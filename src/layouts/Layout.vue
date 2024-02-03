<template>
  <div class="w-full h-screen bg-opacity-90 flex flex-col" style="text-shadow: 1px 1px #2c2c2c; background:#121313">
    <div
      class="text-gray-600 font-medium text-lg md:sticky fixed w-full bottom-0 md:top-0 md:bottom-unset z-10 border-b border-slate-600	"
      style="background:#121313; max-height:52px;">
      <div class="flex justify-between">
        <div class="p-2 hidden md:block">
          <img :src="remnantImage" style="width:40px;" class="ml-2" />
        </div>
        <nav
          class="nav grid grid-flow-col auto-cols-fr text-center max-w-3xl m-auto justify-center items-center h-full pr-10">
          <!-- <g-link
          class="nav__link mr-3 p-3 hover:border-gray-600 border-transparent border-b-4 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25"
          exact-active-class="border-gray-600 text-gray-400" to="/"> <font-awesome :icon="['fas', 'house']" />
          HOME</g-link> -->
          <router-link
            class="nav__link p-2 flex items-center justify-center  md:p-3 hover:border-slate-300 border-transparent border-b-2 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25"
            exact-active-class="border-gray-600  text-gray-400 " to="/"> <mdi-plus />
            BUILD PLANNER</router-link>
          <router-link
            class="nav__link flex items-center justify-center md:mr-3 mr-2 p-2 md:p-3 hover:border-slate-300 border-transparent border-b-2 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25"
            exact-active-class="border-gray-600 text-gray-400" to="/builds"> <mdi-format-list-bulleted />
            MY BUILDS</router-link>
        </nav>
      </div>
      <div v-show="!user" ref="signin_ref" class="absolute right-5 md:top-3 bottom-2 md:bottom-unset cursor-pointer">
      </div>
      <div>
        <div
          class="absolute right-5 md:top-3 bottom-2 md:bottom-unset cursor-pointer rounded-full w-8 h-8 overflow-hidden">
          <LogoutPopover v-show="user">
            <div>
              <img :src="user?.picture" />
            </div>
          </LogoutPopover>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import { jwtDecode } from "jwt-decode";
import remnantImage from '~/assets/remnant.webp'

const signin_ref = ref(null);
const user = ref(null);

var renderGoogleSigninButton = function () {
  google.accounts.id.initialize({
    client_id: '198301617155-f2jb82g7ibfro25gtpk2iivssoscva0g.apps.googleusercontent.com',
    callback: function (user_profile) {
      if (user_profile?.credential) {
        window.localStorage.setItem('credential', user_profile?.credential);
        user.value = jwtDecode(user_profile?.credential);
        window.location.reload();
      }
    }
  });
  google.accounts.id.renderButton(signin_ref.value, { theme: "filled_black", size: 'medium', text: 'Sign in', type: window.innerWidth < 768 ? 'icon' : 'standard' })
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


