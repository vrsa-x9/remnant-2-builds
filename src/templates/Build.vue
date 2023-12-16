<template>
  <Layout>
    <Build v-if="build" :saved_build="build" @update-build="updateBuild"></Build>
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
  methods: {
    updateBuild(build) {
      const { id } = this.$route.params;
      const builds = JSON.parse(window.localStorage.getItem('builds'));
      builds[id] = build;
      window.localStorage.setItem("builds", JSON.stringify(builds));
      this.$router.push({ path: '/builds' });
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