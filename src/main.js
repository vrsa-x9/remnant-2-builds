// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import VueTippy, { TippyComponent } from "vue-tippy";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'

import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faHouse,faPlus,faList } from '@fortawesome/free-solid-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'



import "tippy.js/themes/light.css";
import "tippy.js/themes/light-border.css";
import "tippy.js/themes/google.css";
import "tippy.js/themes/translucent.css";

import './css/main.css'


config.autoAddCss = false;
library.add(faHouse,faGoogle,faPlus,faList)

export default function (Vue, { router, head, isClient }) {
  Vue.use(
    VueTippy,
  )

  Vue.component('font-awesome', FontAwesomeIcon)

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('tippy', TippyComponent)

}
