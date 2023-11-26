// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueTippy, { TippyComponent } from "vue-tippy";



import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/google.css";
import "tippy.js/themes/translucent.css";

import './css/main.css'


export default function (Vue, { router, head, isClient }) {
  Vue.use(
    VueTippy,
  )
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('tippy', TippyComponent)

}
