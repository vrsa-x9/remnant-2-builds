<script>
import Stats from '~/components/Stats.vue'
import Effects from '~/components/Effects.vue'
import ItemPicker from '~/components/ItemPicker.vue'
import Item from '~/components/Item.vue'

export default {
    metaInfo: {
        title: 'Build Planner'
    },
    props: {
        saved_build: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        Stats, Effects, ItemPicker,Item
    },
    data() {
        return {
            isActive: false,
            selection: null,
            build_name: '',
            is_editing: true,
            build: {

            },
        }
    },
    mounted() {
        this.build = this.saved_build;
        this.build_name = this.saved_build.build_name || '';
        this.is_editing = !this.saved_build.build_name;

    },
    methods: {
        selectItem(item) {
            this.build[this.selection] = item;
            this.selection = null;
        },
        updateBuild() {
            this.$emit('update-build', {
                ...this.build,
                build_name: this.build_name
            });
        },
        createNewBuild() {
            const builds = JSON.parse(window.localStorage.getItem('builds')) || [];
            builds.push({
                ...this.build,
                build_name: this.build_name
            });
            window.localStorage.setItem("builds", JSON.stringify(builds));
            this.$router.push({ path: '/builds' });
        }
    }
}


</script>

<template>
    <div class="h-full" style="background: radial-gradient(#121313 65%, #1a1f1f);">
        <div class="grid  justify-center items-center h-full" style="grid-template-columns:1fr 300px 250px 300px 1fr;">
            <Stats></Stats>
            <div class="relative h-full rings">
                <div class="border-l ring-background left" style="background:transparent;"></div>
                <div class="absolute w-28 h-28 rounded-full border border-gray-800 hover:border-white cursor-pointer"
                    style="top:30px;right:50px;"></div>
                <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:170px;right:150px;"></div>
                <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:270px;right:185px;"></div>
                <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:370px;right:210px;"></div>
                <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:470px;right:185px;"></div>
                <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:570px;right:150px;" @click="selection = 'Relics'">
                    <Item :item="build.Relics"></Item>
                </div>
                <div class="absolute w-40 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:670px;right:-20px;" @click="selection = 'LongGuns'">
                    <Item :item="build.LongGuns"></Item>
                </div>
            </div>
            <div class="relative h-full rings z-2 group">
                <g-image src="~/assets/remnant.webp" width="500" style="margin-top:150px;" />
                <div v-if="is_editing" style="background:none;">
                    <div class="input mt-10 w-full" :class="{ 'active': isActive }">
                        <input v-model="build_name" type="text" class="text-gray-300 font-medium"
                            placeholder="Enter build name here" @focus="isActive = true" @blur="isActive = false" />
                    </div>
                    <div v-if="build_name.length > 0" style="background:none;">
                        <button v-if="saved_build.build_name" class="w-full mt-4" @click="updateBuild"> Update
                            build</button>
                        <button v-else class="w-full mt-4" @click="createNewBuild"> Create new build</button>
                        <div class="mt-2 text-gray-500 text-xs text-center" style="background:none;"> You are not signed in,
                            saved builds will not be persisted across the devices</div>
                    </div>
                </div>
                <div class="text-center" style="background:none;" v-else>
                    <div class="text-gray-300 text-lg mt-10 font-semibold" style="background:none;"> {{ build_name }}</div>
                    <button class="mt-4 invisible group-hover:visible" @click="is_editing = true"> Edit</button>
                </div>
                <div class="absolute w-40 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:670px;left:45px;" @click="selection = 'Melee'">
                    <Item :item="build.Melee"></Item>
                </div>
            </div>
            <div class="relative h-full rings">
                <div class="border-r ring-background right pointer-events-none" style="background:transparent"></div>
                <div class="absolute w-28 h-28 rounded-full border border-gray-800 hover:border-white cursor-pointer"
                    style="top:30px;left:50px;"></div>
                <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:170px;left:150px;" @click="selection = 'Amulet'">
                    <Item :item="build.Amulet"></Item>
                </div>
                <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:270px;left:185px;" @click="selection = 'Ring1'">
                    <Item :item="build.Ring1"></Item>
                </div>
                <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:370px;left:210px;" @click="selection = 'Ring2'">
                    <Item :item="build.Ring2"></Item>
                </div>
                <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:470px;left:185px;" @click="selection = 'Ring3'">
                    <Item :item="build.Ring3"></Item>
                </div>
                <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:570px;left:150px;" @click="selection = 'Ring4'">
                    <Item :item="build.Ring4"></Item>
                </div>
                <div class="absolute w-40 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
                    style="top:670px;left:-20px;" @click="selection = 'handGuns'">
                    <Item :item="build.handGuns"></Item>
                </div>
            </div>
            <Effects>
            </Effects>
        </div>
        <ItemPicker v-if="selection" :selected_item="selection"
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
</style>
