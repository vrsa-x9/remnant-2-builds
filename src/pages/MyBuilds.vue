<template>
    <div style="background: #121313;">
        <div v-if="loading" class="w-full h-full flex justify-center items-center text-2xl font-medium text-gray-600">
            <mdi-loading class="animate-spin ml-2"></mdi-loading>
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
                        <div class="flex items-start">
                            <mdi-edit class="opacity-60 hover:opacity-100 mr-2"></mdi-edit>
                            <div @click.stop>
                                <SharePopup :url="getUrl(build)">
                                    <mdi-share class="opacity-60 hover:opacity-100 mr-2"></mdi-share>
                                </SharePopup>
                            </div>
                            <mdi-loading v-if="deleting === build.id" class="animate-spin"></mdi-loading>
                            <div v-else @click.stop="">
                                <AlertPopup @continue="deleteBuild(build, index)">
                                    <mdi-trash class="opacity-60 hover:opacity-100 text-red-400"></mdi-trash>
                                    <template #content>
                                        {{ build.build_name }}
                                    </template>
                                </AlertPopup>
                            </div>
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
import { useToast } from "@/components/shadcn/ui/toast/use-toast"


export default {
    metaInfo: {
        title: 'My Builds'
    },
    setup() {
        const supabase = inject('supabase');
        const { toast } = useToast()

        return { supabase, toast }
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
        getUrl(build) {
            return window.location.origin + '/build/' + build?.id;
        },
        async deleteBuild(build, index) {
            this.deleting = build.id;
            try {
                const credentials = get_credentials();
                if (credentials) {
                    await this.supabase.from('Builds').delete().eq('id', build.id);
                    this.builds.splice(index, 1);
                    this.toast({
                        title: "Success!",
                        description: "Build deleted successfully",
                    });
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