<template>
    <Layout>
        <div v-if="loading" class="w-full h-full flex justify-center items-center text-2xl font-medium text-gray-600">
            Loading...
        </div>
        <div v-else class="h-full" style="background: #121313;">
            <div class="flex justify-center items-center h-full column" v-if="builds.length === 0">
                <div class="text-center">
                    <div class="text-2xl font-medium text-gray-600"> No Builds Found </div>
                    <button class="mt-4" @click="$router.push({ path: '/planner' })"> Create new build</button>
                </div>
            </div>
            <div class="grid gap-4 m-4" style="grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));" v-else>
                <div v-for="(build, index) in builds" :key="index"
                    class="text-gray-400 p-4 border border-gray-600 rounded-lg hover:border-gray-300 cursor-pointer builds group"
                    @click="$router.push({ path: '/build/' + index })">
                    <div class="text-center text-xl font-semibold mb-2">{{ build.build_name }} </div>
                    <div class="grid gap-2 grid-cols-5 mt">
                        <div v-for="item in items" :key="item">
                            <g-image v-if="build[item]" :src="build[item].itemImageLinkFullPath" style="width:100%;" />
                        </div>
                    </div>
                    <div class="grid gap-2 grid-cols-3 mt">
                        <div v-for="weapon in weapons" :key="weapon">
                            <g-image v-if="build[weapon]" :src="build[weapon].itemImageLinkFullPath" style="width:100%;" />
                        </div>
                    </div>
                    <div class="invisible group-hover:visible">
                        <button @click.stop="deleteBuild(build, index)" class="mt"> Delete </button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import { inject } from 'vue'

export default {
    metaInfo: {
        title: 'My Builds'
    },
    setup() {
        const supabase = inject('supabase');
        return { supabase }
    },
    data() {
        return {
            builds: [],
            loading: false,
            items: ['Amulet', "Ring1", "Ring2", "Ring3", "Ring4"],
            weapons: ['LongGuns', 'Melee', 'handGuns']
        }
    },
    async mounted() {
        this.loading = true;
        try {
            const { data } = await this.supabase.from('Builds').select();
            this.builds = data;
            this.builds = JSON.parse(localStorage.getItem('builds')) || [];

        }
        catch (e) {
            console.log(e);
        }
        this.loading = false;

    },
    methods: {
        deleteBuild(build, index) {
            this.builds.splice(index, 1);
            localStorage.setItem('builds', JSON.stringify(this.builds));
        }
    }
}
</script>

<style>
.builds {
    background: #1a1f1f;
    box-shadow: inset 0px 0px 15px #121313;
}
</style>