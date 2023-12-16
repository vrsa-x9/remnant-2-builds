<template>
  <Empty>
    <Build v-if="build" :saved_build="build" @update-build="updateBuild"></Build>
  </Empty>
</template>
  
<script>
import Build from "~/components/Build.vue";
import Empty from '~/layouts/Empty.vue'

export default {
  components: {
    Build,
    Empty
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