<script>
import Stats from '~/components/Stats.vue'
import Traits from '~/components/Traits.vue'
import ItemPicker from '~/components/ItemPicker.vue'
import Loading from '~/components/Loading.vue'
import Item from '~/components/Item.vue'
import { get_credentials } from '~/lib/auth.js'
import { inject } from 'vue'
import { versions } from "../items/Versions.json"
import remnantImage from '~/assets/remnant.webp'
import { useToast } from "@/components/shadcn/ui/toast/use-toast"
import { Button } from '@/components/shadcn/ui/button'



export default {
    metaInfo: {
        title: 'Build Planner'
    },
    setup() {
        const supabase = inject('supabase');
        const credential = get_credentials();
        const { toast } = useToast()

        return { supabase, credential, toast }
    },
    props: {
        saved_build: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        Stats, Traits, ItemPicker, Item, Button
    },
    data() {
        return {
            isActive: false,
            selection: null,
            build_name: '',
            is_editing: true,
            is_loading: false,
            build: {
            },
            traits: [],
            version: versions[0],
            versions,
            remnantImage
        }
    },
    mounted() {
        this.build = this.saved_build;
        this.version = this.saved_build.version || this.version;
        this.traits = this.saved_build.traits || [];
        this.build_name = this.saved_build.build_name || '';
        this.is_editing = !this.saved_build.build_name;

        const el = this.$refs.scrollToMe;
        if (window.innerWidth < 600)
            this.$nextTick(() => el.scrollIntoView({ inline: 'center' }));

    },
    computed: {
        max_allowed_trait_points() {
            const pre_set_points = (this.build?.Archetype2 ? 10 : 0) + (this.build?.Archetype1 ? 10 : 0)
            const allocated_trait_points = this.traits.map(trait => trait.points).reduce((sum, point) => sum + point, 0);
            const total_points = allocated_trait_points + pre_set_points;
            return total_points;
        },
    },
    methods: {
        selectItem(item) {
            if (this.selection === 'Traits') {
                item.points = 10;
                this.traits.push(item);
            }
            else
                this.build[this.selection?.key || this.selection] = item;
            this.selection = null;
        },
        async updateBuild() {
            this.is_loading = true;
            try {
                const { id } = this.$route.params;
                const credential = get_credentials();
                const build = {
                    ...this.build,
                    version: this.version,
                    traits: this.traits,
                    build_name: this.build_name,
                    email: credential.email,
                    user_name: credential.name
                };
                if (credential) {
                    await this.upsertUserData(build, credential?.email, id);
                    this.toast({
                        title: "Success!",
                        description: "Build Updated successfully",
                    });
                }
                else {
                    const builds = JSON.parse(window.localStorage.getItem('builds'));
                    builds[id] = build;
                    window.localStorage.setItem("builds", JSON.stringify(builds));
                }
            }
            catch (e) {
                console.log(e);
            }
            this.is_loading = false;
        },
        async upsertUserData(build, email, id) {
            const { data, error } = await this.supabase
                .from('Builds')
                .upsert({ email, game_version: build.version, build_data: build, id, name: build.build_name }).select();
            return data?.[0];
        },
        async deleteBuild(build) {
            const credentials = get_credentials();
            try {
                if (credentials.email === build.email) {
                    const { id } = this.$route.params;
                    await this.supabase.from('Builds').delete().eq('id', id);
                    this.toast({
                        title: "Success!",
                        description: "Build deleted successfully",
                    });
                    this.$router.push({ name: "my_builds" })
                }
            }
            catch (e) {
                console.log(e);
            }
        },
        async createNewBuild(is_import) {
            this.is_loading = true;
            try {
                const credential = get_credentials();
                const build = {
                    ...this.build,
                    version: this.version,
                    traits: this.traits,
                    build_name: this.build_name,
                    email: credential.email,
                    user_name: credential.name
                };
                if (credential) {
                    const new_build = await this.upsertUserData(build, credential.email);
                    this.toast({
                        title: "Success!",
                        description: is_import ? "Build imported successfully" : "Build created successfully",
                    });
                    if (new_build?.id) {
                        this.$router.push({ name: "build", params: { id: new_build.id } })
                    }
                }
                else {
                    const builds = JSON.parse(window.localStorage.getItem('builds')) || [];
                    builds.push(build);
                    window.localStorage.setItem("builds", JSON.stringify(builds));
                }
            }
            catch (e) {
                console.log(e);
            }
            this.is_loading = false;
        },
        deleteTrait(index) {
            this.traits.splice(index, 1);
        },
        get_locked_mod_data(locked_mod, actual_mod) {
            return locked_mod?.modName ? {
                itemImageLinkFullPath: locked_mod.modImageFullPath,
                itemName: locked_mod.modName,
                itemDescription: locked_mod.modDescription,
            } : actual_mod

        }
    }
}





</script>


<template>
    <div class="h-full" style="background: radial-gradient(#121313 65%, #1a1f1f);">
        <div class=" md:justify-center items-center h-screen overflow-auto grid build-container w-screen pb-20  pt-5">
            <div></div>
            <div class="justify-center items-center grid build-slots w-full">
                <div class="relative rings flex flex-col items-end" style="height:780px;">
                    <div class="border-l ring-background left hidden md:block" style="background:transparent;">
                    </div>
                    <div class="flex items-center justify-center mb-2" style="background:none">
                        <div v-if="build.Archetype1"
                            class="md:absolute md:w-20 md:h-20 w-16 h-16 border border-gray-800 mr-2 rounded hover:border-white cursor-pointer"
                            style="top:45px;right:180px;"
                            @click="selection = { data: build.Archetype1.skills, key: 'skill1' }">
                            <Item :item="build.skill1"></Item>
                        </div>
                        <div class="md:absolute md:w-28 md:h-28 w-24 h-24 rounded-full border border-gray-800 hover:border-white cursor-pointer overflow-hidden"
                            style="top:30px;right:50px;" @click="selection = 'Archetype1'">
                            <Item :item="build.Archetype1" :image="{ height: 120, class: 'p-3  relative -top-1' }"></Item>
                        </div>
                    </div>
                    <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:170px;right:150px;" @click="selection = 'Helmet'">
                        <Item :item="build.Helmet"></Item>
                    </div>
                    <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:270px;right:185px;" @click="selection = 'Body'">
                        <Item :item="build.Body"></Item>
                    </div>
                    <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:370px;right:210px;" @click="selection = 'Legs'">
                        <Item :item="build.Legs"></Item>
                    </div>
                    <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:470px;right:185px;" @click="selection = 'Gloves'">
                        <Item :item="build.Gloves"></Item>
                    </div>
                    <div class="flex mb-2" style="background:none">
                        <div class="grid gap-1" style="background:none">
                            <div class="md:absolute border border-gray-800 rounded hover:border-white cursor-pointer"
                                style="top:570px;right:235px;width:23.33px;height:23.33px;"
                                @click="selection = 'RelicFragment1'">
                                <Item :item="build.RelicFragment1" :image="{ height: 20 }"></Item>
                            </div>
                            <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                                style="top:598px;right:235px;width:23.33px;height:23.33px;"
                                @click="selection = 'RelicFragment2'">
                                <Item :item="build.RelicFragment2" :image="{ height: 20 }"></Item>
                            </div>
                            <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                                style="top:626px;right:235px;width:23.33px;height:23.33px;"
                                @click="selection = 'RelicFragment3'">
                                <Item :item="build.RelicFragment3" :image="{ height: 20 }"></Item>
                            </div>
                        </div>
                        <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer ml-2"
                            style="top:570px;right:150px;" @click="selection = 'Relics'">
                            <Item :item="build.Relics"></Item>
                        </div>
                    </div>
                    <div class="md:absolute w-40 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:670px;right:-20px;" @click="selection = 'LongGuns'">
                        <Item :item="build.LongGuns"></Item>
                    </div>
                    <div class="flex items-center " style="background:none;">
                        <div class="md:absolute w-16 h-16 border border-gray-800 rounded hover:border-white cursor-pointer"
                            style="top:585px;right:-20px; width:75px;height:75px;" @click="selection = 'Mutator1'">
                            <Item :item="build.Mutator1" :image="{ height: 73 }"></Item>
                        </div>
                        <div class="md:absolute border border-gray-800 rounded hover:border-white cursor-pointer ml-2"
                            style="top:585px;right:65px; width:75px;height:75px;"
                            :class="get_locked_mod_data(build.LongGuns?.lockedModInfo, build.Mod1) ? '!cursor-not-allowed' : ''"
                            @click="selection = get_locked_mod_data(build.LongGuns?.lockedModInfo, build.Mod1) ? null : 'Mod1'">
                            <Item :item="get_locked_mod_data(build.LongGuns?.lockedModInfo, build.Mod1)"
                                :image="{ height: 73 }">
                            </Item>
                        </div>
                    </div>
                </div>
                <div ref="scrollToMe" class="relative rings z-2 group">
                    <div style="background:none;max-width:250px;" class="mb-4">
                        <img :src="remnantImage" width="500" class="mt-4 md:mt-20" />
                        <div v-if="is_editing" style="background:none;">
                            <div class="flex  mt-4 mb-4 text-center items-center justify-center" style="background:none;">
                                <span class="text-gray-400 mr-6 whitespace-nowrap">Game Version: </span>
                                <VersionSelect :versions="versions" v-model="version"></VersionSelect>
                            </div>
                            <div class="input w-full custom" :class="{ 'active': isActive }">
                                <input v-model="build_name" type="text" class="text-gray-300 font-medium"
                                    placeholder="Enter build name here" @focus="isActive = true" @blur="isActive = false" />
                            </div>
                            <div v-if="credential" style="background:none;">
                                <button v-if="saved_build.build_name"
                                    class="w-full mt-4 !flex items-center justify-center custom"
                                    :disabled="is_loading || max_allowed_trait_points > 85 || build_name.length === 0"
                                    @click="updateBuild">
                                    Update
                                    build
                                    <mdi-loading v-if="is_loading" class="animate-spin ml-2"></mdi-loading>
                                </button>
                                <button v-else class="w-full mt-4 !flex items-center justify-center custom"
                                    @click="createNewBuild()"
                                    :disabled="is_loading || max_allowed_trait_points > 85 || build_name.length === 0">
                                    Create new build
                                    <mdi-loading v-if="is_loading" class="animate-spin ml-2"></mdi-loading>
                                </button>
                            </div>
                            <div v-else class="mt-2 text-gray-500  text-center" style="background:none;">
                                Signin to create or update builds</div>
                        </div>
                        <div class="text-center" style="background:none;" v-else>
                            <div class="text-gray-300 text-lg mt-10 font-semibold" style="background:none;"> {{ build_name
                            }}
                                <span class="text-xs text-gray-500">({{
                                    version }})</span>
                            </div>
                            <div v-if="build.user_name" class="text-gray-500 text-sm font-light" style="background:none;">
                                {{ build.user_name }}
                            </div>
                            <button v-if="credential?.email !== build.email" class="mt-4 custom"
                                :disabled="is_loading || max_allowed_trait_points > 85" @click="createNewBuild(true)">
                                <span class="flex items-center justify-center">
                                    <mdi-content-copy class="mr-2"></mdi-content-copy> Copy build <mdi-loading
                                        v-if="is_loading" class="animate-spin ml-2"></mdi-loading>
                                </span>
                            </button>
                            <span v-else class="flex items-center justify-center mt-4">
                                <button v-if="credential" class="custom mr-4" @click="is_editing = true"> Edit</button>
                                <SharePopup>
                                    <Button variant="outline">
                                        <mdi-share></mdi-share>
                                        Share
                                    </Button>
                                </SharePopup>
                                <AlertPopup @continue="deleteBuild(build)">
                                    <button class="custom ml-4"> Delete </button>
                                    <template #content>
                                        {{ build.build_name }}
                                    </template>
                                </AlertPopup>
                            </span>
                        </div>
                        <div v-if="max_allowed_trait_points > 85" class="text-xs text-center mt-2"
                            style="background:none;color:#940D18"> ! Traits cannot be more
                            than
                            85 points
                        </div>
                    </div>
                    <div class="md:absolute w-40 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                        style="top:670px;left:45px;" @click="selection = 'Melee'">
                        <Item :item="build.Melee"></Item>
                    </div>
                    <div class="flex mt-2" style="background: none;">
                        <div class="md:absolute w-16 h-16 border border-gray-800 rounded hover:border-white cursor-pointer mr-2"
                            style="top:585px;left:45px; width:75px;height:75px;"
                            :class="get_locked_mod_data(build.Melee?.lockedModInfo, build.Mod2) ? '!cursor-not-allowed' : ''"
                            @click="selection = get_locked_mod_data(build.Melee?.lockedModInfo, build.Mod2) ? null : 'Mod2'">
                            <Item :item="get_locked_mod_data(build.Melee?.lockedModInfo, build.Mod2)"
                                :image="{ height: 73 }">
                            </Item>
                        </div>
                        <div class="md:absolute border border-gray-800 rounded hover:border-white cursor-pointer"
                            style="top:585px;left:130px; width:75px;height:75px;" @click="selection = 'Mutator2'">
                            <Item :item="build.Mutator2" :image="{ height: 73 }"></Item>
                        </div>
                    </div>
                </div>
                <div class="relative rings flex flex-col items-start" style="height:780px;">
                    <div class="border-r ring-background right pointer-events-none hidden md:inline"
                        style="background:transparent"></div>
                    <div class="flex items-center justify-center mb-2" style="background:none">
                        <div class="md:absolute md:w-28 md:h-28 w-24 h-24  rounded-full border border-gray-800 hover:border-white cursor-pointer overflow-hidden"
                            style="top:30px;left:50px;" @click="selection = 'Archetype2'">
                            <Item :item="build.Archetype2" :image="{ height: 120, class: 'p-3 relative -top-1' }"></Item>
                        </div>
                        <div v-if="build.Archetype2"
                            class="md:absolute  md:w-20 md:h-20 w-16 h-16 border border-gray-800 rounded hover:border-white cursor-pointer ml-2"
                            style="top:45px;left:180px;"
                            @click="selection = { data: build.Archetype2.skills, key: 'skill2' }">
                            <Item :item="build.skill2"></Item>
                        </div>
                    </div>
                    <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:170px;left:150px;" @click="selection = 'Amulet'">
                        <Item :item="build.Amulet"></Item>
                    </div>
                    <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:270px;left:185px;" @click="selection = 'Ring1'">
                        <Item :item="build.Ring1"></Item>
                    </div>
                    <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:370px;left:210px;" @click="selection = 'Ring2'">
                        <Item :item="build.Ring2"></Item>
                    </div>
                    <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:470px;left:185px;" @click="selection = 'Ring3'">
                        <Item :item="build.Ring3"></Item>
                    </div>
                    <div class="md:absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:570px;left:150px;" @click="selection = 'Ring4'">
                        <Item :item="build.Ring4"></Item>
                    </div>
                    <div class="md:absolute w-40 h-20 border border-gray-800 rounded hover:border-white cursor-pointer mb-2"
                        style="top:670px;left:-20px;" @click="selection = 'handGuns'">
                        <Item :item="build.handGuns"></Item>
                    </div>
                    <div class="flex items-center justify-center" style="background:none;">
                        <div class="md:absolute w-16 h-16 border border-gray-800 rounded hover:border-white cursor-pointer mr-2"
                            style="top:585px;left:-20px; width:75px;height:75px;"
                            :class="get_locked_mod_data(build.handGuns?.lockedModInfo, build.Mod3) ? '!cursor-not-allowed' : ''"
                            @click="selection = get_locked_mod_data(build.handGuns?.lockedModInfo, build.Mod3) ? null : 'Mod3'">
                            <Item :item="get_locked_mod_data(build.handGuns?.lockedModInfo, build.Mod3)"
                                :image="{ height: 73 }">
                            </Item>
                        </div>
                        <div class="md:absolute border border-gray-800 rounded hover:border-white cursor-pointer"
                            style="top:585px;left:65px; width:75px;height:75px;" @click="selection = 'Mutator3'">
                            <Item :item="build.Mutator3" :image="{ height: 73 }"></Item>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid justify-center items-center grid-cols-1 traits-container">
                <div style="max-width:200px;" class="m-auto">
                    <div v-if="max_allowed_trait_points">
                        <div class="text-gray-400  text-lg"> Traits</div>
                        <div class="mb-4 text-gray-400  "> {{ max_allowed_trait_points }} / 85</div>
                    </div>
                    <Traits v-if="build?.Archetype2 || build?.Archetype1"
                        :traits="[build.Archetype1?.trait, build.Archetype2?.trait].filter(trait => trait).map(trait => ({ is_archetype: true, itemName: trait, points: 10 }))">
                    </Traits>
                    <Traits :traits="traits" @delete="deleteTrait" :enable_addition="max_allowed_trait_points < 85"
                        class="mt-2"></Traits>
                    <div v-if="max_allowed_trait_points < 85" class="flex items-center "> <button
                            class=" mt-4 !flex items-center justify-center custom" @click="selection = 'Traits'">
                            <mdi-plus></mdi-plus> Add traits</button></div>
                </div>
            </div>
        </div>
        <ItemPicker v-if="selection" :selected_item="selection" :build="build" :traits="traits"
            :is_weapon="['Melee', 'handGuns', 'LongGuns'].includes(selection)" @close="selection = null"
            @select-item="selectItem">
        </ItemPicker>
    </div>
</template>



<style>
.rings div {
    background: #1a1f1f;
    box-shadow: inset 0px 0px 15px #121313;
}

.ring-background {
    height: 652px;
    position: absolute;
    width: 350px;
    background: transparent !important;
    box-shadow: none !important;
    border-color: #5a5f5f;
    top: 83px;
}

.ring-background.left {
    border-bottom-left-radius: 50%;
    border-top-left-radius: 50%;
    left: 58px;

}

.ring-background.right {
    border-bottom-right-radius: 50%;
    border-top-right-radius: 50%;
    right: 58px;
}

.build-container {
    grid-template-columns: 1fr;
}

.build-slots {
    grid-template-columns: 300px 250px 300px;
}

.build-slots>div {
    height: 780px;
}

@media (min-width: 1024px) {
    .build-container {
        grid-template-columns: 1fr 850px 1fr;
    }
}

@media (max-width: 768px) {
    .build-slots .group {
        order: -1;
        grid-column: 1 / span 2;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        height: unset;
    }

    .build-slots {
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .build-slots .group img {
        width: 125px;
        margin: auto;
    }

    .build-slots>div {
        width: unset;
    }

    .traits-container {
        padding-bottom: 100px;
    }

}
</style>
