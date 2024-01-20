<template>
  <Layout>
    <div v-if="loading" class="w-full h-full flex justify-center items-center text-2xl font-medium text-gray-600">
      Loading...
    </div>
    <Build v-else-if="build" :saved_build="build"></Build>
  </Layout>
</template>
  
<script>
import Build from "~/components/Build.vue";
import { get_credentials } from '~/constants.js'
import { inject } from 'vue'

export default {
  components: {
    Build
  },
  setup() {
    const supabase = inject('supabase');
    return { supabase }
  },
  data() {
    return {
      build: null,
      loading: false
    }
  },
  async mounted() {
    this.loading = true;
    try {
      const { id } = this.$route.params;
      const credentials = get_credentials();
      if (credentials) {
        const { data, error } = await this.supabase
          .from('Builds').select().eq('id', id);
        this.build = data[0]?.build_data || {};
      }
      else {
        const builds = JSON.parse(window.localStorage.getItem('builds'));
        this.build = builds[id];
      }
    }
    catch (e) {
      console.log(e);
    }
    this.loading = false;

  }
};
</script>
  
<style></style>