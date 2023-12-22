<template>
    <div class="grid grid-cols-1 justify-center items-center h-full text-gray-500 font-semibold text-sm">
        <div class="grid grid-cols-1 justify-center items-center gap-2" style="grid-template-columns:130px;">
            <div v-for="(trait, i) in traits" :key="trait.itemName" class="flex items-center justify-center group">
                <div>
                    {{ trait.itemName }}
                    <div class="flex">
                        <div v-for="(item, index) in [
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false,
                            false
                        ]" :key="index">
                            <div v-if="item" class="rounded-full w-2.5 h-2.5 border-2 bg-red-400 mr-1"
                                style="box-shadow: 0px 0px 2px #ccc; border-color:#1a1b1f"></div>
                            <div v-else class="rounded-full w-2.5 h-2.5 border-2 bg-gray-400 mr-1"
                                style="box-shadow: 0px 0px 2px #ccc; border-color:#1a1b1f"></div>
                        </div>
                    </div>
                </div>
                <div class="ml-2 mt-2 cursor-pointer opacity-60 hover:opacity-100 invisible group-hover:visible"
                    @click="$emit('delete', i)">
                    <font-awesome :icon="['fas', 'trash']" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    traits: {
        type: Array,
        required: true,
        default: () => []
    }
})

</script>

<style></style>