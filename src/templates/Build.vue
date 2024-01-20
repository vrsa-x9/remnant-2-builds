<template>
  <Layout>
    <Build v-if="build" :saved_build="build"></Build>
  </Layout>
</template>
  
<script>
import Build from "~/components/Build.vue";

export default {
  components: {
    Build
  },
  data() {
    return {
      build: null,
    }
  },
  async mounted() {
    const { id } = this.$route.params;
    const builds = JSON.parse(window.localStorage.getItem('builds'));
    this.build = builds[id];
  }
};
</script>
  
<style></style>