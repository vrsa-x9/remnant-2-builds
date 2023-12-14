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
        <font-awesome :icon="['fab', 'google']" /> Sign in
      </div>
      <div v-show="user" class="absolute right-5 top-3 cursor-pointer" @click="signOut">
        Sign out
      </div>

    </header>
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const signin_ref = ref(null);
const user = ref(null);
var startApp = function () {
  gapi.load('auth2', function () {
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    gapi.auth2.init({
      client_id: '198301617155-f2jb82g7ibfro25gtpk2iivssoscva0g.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',

    });
    attachSignin(signin_ref.value);
  });
};

function attachSignin(element) {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.attachClickHandler(element, {},
    function (googleUser) {
      console.log(googleUser);
      user.value = googleUser;
    }, function (error) {
      alert(JSON.stringify(error, undefined, 2));
    });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}


onMounted(() => {
  startApp();
})
</script>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

