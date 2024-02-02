<template>
    <div style="background: #121313;">
        <div v-if="loading" class="w-full h-full flex justify-center items-center text-2xl font-medium text-gray-600">
            Loading...
        </div>
        <div v-else class="h-full">
            <div class="flex justify-center items-center h-full column" v-if="builds.length === 0">
                <div class="text-center">
                    <div class="text-2xl font-medium text-gray-600"> No Builds Found </div>
                    <button class="mt-4 custom" @click="$router.push({ path: '/' })"> Create new build</button>
                </div>
            </div>
            <div class="grid gap-4 m-4" style="grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));" v-else>
                <div v-for="(build, index) in builds" :key="index"
                    class="text-gray-400 p-4 border border-gray-600 rounded-lg hover:border-gray-300 cursor-pointer builds group"
                    @click="$router.push({ path: '/build/' + (build.id || index) })">

                    <div class="text-center text-xl font-semibold mb-2 flex justify-between items-center">
                        {{
                            build.build_name
                        }}
                        <mdi-reload v-if="deleting === build.id" class="animate-spin"></mdi-reload>
                        <div v-else @click.stop="">
                            <AlertPopup @continue="deleteBuild(build, index)">
                                <mdi-trash class="opacity-60 hover:opacity-100"></mdi-trash>
                            </AlertPopup>
                        </div>
                    </div>
                    <div class="grid gap-2 grid-cols-5 mt">
                        <div v-for="item in items" :key="item">
                            <img v-if="build[item]" :src="build[item].itemImageLinkFullPath" style="width:100%;" />
                        </div>
                    </div>
                    <div class="grid gap-2 grid-cols-3 mt">
                        <div v-for="weapon in weapons" :key="weapon">
                            <img v-if="build[weapon]" :src="build[weapon].itemImageLinkFullPath" style="width:100%;" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { inject } from 'vue'
import { get_credentials } from '~/lib/auth.js'

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
            deleting: false,
            items: ['Amulet', "Ring1", "Ring2", "Ring3", "Ring4"],
            weapons: ['LongGuns', 'Melee', 'handGuns']
        }
    },
    async mounted() {
        this.loading = true;
        try {
            const credentials = get_credentials();
            if (!credentials) {
                this.builds = JSON.parse(localStorage.getItem('builds')) || [];
            }
            else {
                const { data } = await this.supabase.from('Builds').select().eq('email', credentials?.email);
                this.builds = data?.map(build => { return { ...build.build_data, id: build.id } }) || [];
            }
        }
        catch (e) {
            console.log(e);
        }
        this.loading = false;

    },
    methods: {
        async deleteBuild(build, index) {
            this.deleting = build.id;
            try {
                const credentials = get_credentials();
                if (credentials) {
                    await this.supabase.from('Builds').delete().eq('id', build.id);
                    this.builds.splice(index, 1);
                }
                else {
                    this.builds.splice(index, 1);
                    localStorage.setItem('builds', JSON.stringify(this.builds));
                }
            }
            catch (e) {
                console.log(e);
            }
            this.deleting = false;

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