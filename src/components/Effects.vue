<template>
    <div class="grid grid-cols-1 justify-center items-center h-full text-gray-500 font-semibold text-sm">
        <div class="grid grid-cols-1 justify-center items-center gap-2" style="grid-template-columns:130px;">
        <div v-for="effect in effects" :key="effect">
            {{ effect }}
            <div class="flex">
                <div v-for="(item, index) in [
                    true,
                    true,
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
        <div>
            Vigor
            <div class="flex">
                <div v-for="(item, index) in [
                    true,
                    true
                ]" :key="index">
                    <div v-if="item" class="rounded-full w-2.5 h-2.5 border-2 bg-red-400 mr-1"
                        style="box-shadow: 0px 0px 2px #ccc; border-color:#1a1b1f"></div>
                    <div v-else class="rounded-full w-2.5 h-2.5 border-2 bg-gray-400 mr-1"
                        style="box-shadow: 0px 0px 2px #ccc; border-color:#1a1b1f"></div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
const effects = [
    "Triage",
    "Kinship",
    "Sprit",
    "Expertise",
    "Bloodstream",
    "Handling",
    "Shadeskin",
];
</script>

<style></style>