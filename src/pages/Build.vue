<template>
    <div>
        <div v-if="loading" class="w-full h-full flex justify-center items-center text-2xl font-medium text-gray-600">
            <mdi-loading class="animate-spin ml-2"></mdi-loading>
        </div>
        <div v-else-if="not_found" class="w-full h-full flex justify-center items-center ">
            <div class="text-center">
                <div class="text-2xl font-medium text-gray-600"> Build not found, must have got deleted :(</div>
                <button class="mt-4 custom" @click="$router.push({ path: '/' })"> Create new build</button>
            </div>
        </div>
        <Build v-else-if="build" :saved_build="build"></Build>
    </div>
</template>
    
<script>
import Build from "~/components/Build.vue";
import { get_credentials } from '~/lib/auth.js'
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
            loading: false,
            not_found: false
        }
    },
    async mounted() {
        await this.initialize_data();
    },
    watch: {
        '$route.params.id': function () {
            this.initialize_data();
        }
    },
    methods: {
        async initialize_data() {
            this.loading = true;
            try {
                const { id } = this.$route.params;
                const { data, error } = await this.supabase
                    .from('Builds').select().eq('id', id);
                this.build = data[0]?.build_data;
                if (!this.build) {
                    const builds = JSON.parse(window.localStorage.getItem('builds'));
                    this.build = builds?.[id];
                }

                if (!this.build) {
                    this.not_found = true;
                }
            }
            catch (e) {
                console.log(e);
            }
            this.loading = false;
        }
    }
};
</script>
    
<style></style>