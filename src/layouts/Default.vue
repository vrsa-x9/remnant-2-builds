<template>
  <div class="w-full h-screen bg-opacity-90 grid" style="grid-template-rows:52px auto; text-shadow: 1px 1px #2c2c2c; background:#0f0f12">
    <header class="header text-gray-600 font-medium">
      <nav class="nav grid grid-flow-col auto-cols-fr text-center max-w-3xl m-auto justify-center items-center h-full">
        <g-link class="nav__link mr-3 p-3 hover:border-gray-600 border-transparent border-b-4 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25" exact-active-class="border-gray-600 text-gray-400" to="/">MY BUILDS</g-link>
        <g-link class="nav__link  p-3 hover:border-gray-600 border-transparent border-b-4 hover:border-current hover:text-gray-400 border-opacity-25 hover:border-opacity-25"  exact-active-class="border-gray-600  text-gray-400 "  to="/about/">BUILD PLANNER</g-link>
      </nav>
    </header>
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

