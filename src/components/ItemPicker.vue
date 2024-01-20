<template>
    <div class="fixed inset-0 bg-black bg-opacity-40 overflow-y-auto h-screen w-full">
        <div class="relative top-44 mx-auto p-5 border border-gray-800 shadow-lg rounded-md "
            style="background-color:#1a1f1f;width:800px">
            <div class="flex justify-between items-center cursor-pointer text-gray-200">
                <div class="w-80">
                    <div class="input" :class="{ active: isActive }">
                        <input v-model="search" class="text-gray-300" placeholder="Search item" @focus="isActive = true"
                            @blur="isActive = false">
                    </div>
                </div>
                <div @click="$emit('close')" class="py-2 px-4 rounded border border-transparent hover:border-gray-600">X
                </div>
            </div>
            <div class="mt-3 max-h-96 overflow-auto">
                <div v-for="item in items_list" :key="item.name" class="mb-3 hover:bg-black rounded-xl p-3 cursor-pointer"
                    @click="$emit('select-item', item)">
                    <div class="grid gap-3" :style="`grid-template-columns:${is_weapon ? '150px' : '75px'} 1fr;`">
                        <g-image :src="item.itemImageLinkFullPath" style="width:100%;" />
                        <div>
                            <div class="text-lg font-semibold text-gray-400">{{ item.itemName || item.skillName }}</div>
                            <div class="text-sm text-gray-400 mt">{{ item.itemDescription }}</div>
                            <div class="text-xs text-gray-400 mt-2">{{ item.itemLore }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Archetypes from "../items/Archetypes.json";
import Amulet from "../items/Amulet.json";
import Body from "../items/Body.json";
import Gloves from "../items/Gloves.json";
import Legs from "../items/Legs.json";
import handGuns from "../items/Handguns.json";
import LongGuns from "../items/LongGuns.json";


import Melee from "../items/Melee.json";
import Relics from "../items/Relics.json";
import Rings from "../items/Rings.json";
import Traits from "../items/Traits.json";
import Mods from "../items/Mods.json";
import Mutators from "../items/Mutators.json";
import Helmets from "../items/Helmets.json";
import RelicFragments from "../items/RelicFragments.json"



const removeExistingItems = (selected_item, build = {}) => {
    const archetypes = [build.Archetype1, build.Archetype2];
    const mods = [build.Mod1, build.Mod2, build.Mod3];
    const mutators = [build.Mutator1, build.Mutator2, build.Mutator3];
    const rings = [build.Ring1, build.Ring2, build.Ring3, build.Ring4];
    const fragments = [build.RelicFragment1, build.RelicFragment2, build.RelicFragment3]
    const item_map = {
        Archetype1: archetypes,
        Archetype2: archetypes,
        Mod1: mods,
        Mod2: mods,
        Mod3: mods,
        Mutator1: mutators,
        Mutator2: mutators,
        Mutator3: mutators,
        Ring1: rings,
        Ring2: rings,
        Ring3: rings,
        Ring4: rings,
        RelicFragment1: fragments,
        RelicFragment2: fragments,
        RelicFragment3: fragments
    }
    const selected_item_list = item_map[selected_item];
    if (selected_item_list) {
        return item => !selected_item_list.filter(item => item).map(item => item.itemId).includes(item.itemId)
    }
    else {
        return item => build[selected_item]?.itemId != item?.itemId
    }
}



export default {
    props: {
        selected_item: {},
        is_weapon: {
            type: Boolean
        },
        build: {
            type: Object
        }
    },
    data() {
        return {
            search: '',
            isActive: false,
            items_map: {
                Archetype1: Archetypes,
                Archetype2: Archetypes,
                Amulet,
                Body,
                Gloves,
                Legs,
                handGuns,
                LongGuns,
                Melee,
                Helmet: Helmets,
                Mod1: Mods,
                Mod2: Mods,
                Mod3: Mods,
                Mutator1: Mutators,
                Mutator2: Mutators,
                Mutator3: Mutators,
                Relics,
                Traits,
                Ring1: Rings,
                Ring2: Rings,
                Ring3: Rings,
                Ring4: Rings,
                RelicFragment1: RelicFragments,
                RelicFragment2: RelicFragments,
                RelicFragment3: RelicFragments
            }
        }
    },
    computed: {
        items_list() {
            const removeExistingItemsFn = removeExistingItems(this.selected_item, this.build);
            return (this.selected_item?.data || this.items_map[this.selected_item] || []).filter(removeExistingItemsFn).filter(item => {
                return (item.skillName || item.itemName).toLowerCase().indexOf(this.search.toLowerCase()) >= 0;
            })
        }
    }
}
</script>

<style></style>