<template>
    <div class="grid grid-cols-1 justify-center items-center h-full text-gray-500 font-semibold text-sm">
        <div class="grid grid-cols-1 justify-center items-center gap-2" style="grid-template-columns:130px;">
            <div v-for="(trait, i) in traits" :key="trait.itemName" class="flex items-center  group">
                <div style="min-width: 150px;">
                    {{ trait.itemName }}
                    <div class="flex">
                        <div v-for="(item, index) in trait.points" :key="index">
                            <div v-if="trait.is_archetype" class="rounded-full w-2.5 h-2.5 border-2 bg-red-400 mr-1"
                                style="box-shadow: 0px 0px 2px #ccc; border-color:#1a1b1f"></div>
                            <div v-else class="rounded-full w-2.5 h-2.5 border-2 bg-gray-400 mr-1"
                                style="box-shadow: 0px 0px 2px #ccc; border-color:#1a1b1f"></div>
                        </div>
                    </div>
                </div>
                <div v-if="!trait.is_archetype" class=" mt-2 cursor-pointer  invisible group-hover:visible flex">
                    <div @click="trait.points++; $forceUpdate();"
                        :class="{ 'opacity-10 pointer-events-none': trait.points == 10 }"
                        class="ml-2 opacity-60 hover:opacity-100">
                        <font-awesome :icon="['fas', 'plus']" />
                    </div>
                    <div @click="trait.points--; $forceUpdate();"
                        :class="{ 'opacity-10 pointer-events-none': trait.points == 1 }"
                        class="ml-2 opacity-60 hover:opacity-100"> <font-awesome :icon="['fas', 'minus']" /></div>
                    <div @click="$emit('delete', i)" class="ml-2 opacity-60 hover:opacity-100"> <font-awesome
                            :icon="['fas', 'trash']" /></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    traits: {
        type: Array,
        required: true,
        default: () => []
    }
})

const traits = computed(() => props.traits);
</script>

<style></style>