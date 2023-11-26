<template>
    <tippy :allowHTML="true" :trigger="item?'mouseenter':'manual'" arrow>
        <template v-slot:trigger>
            <g-image v-if="item" :src="item.itemImageLinkFullPath" style="width:100%;height:78px;" />
        </template>
        <div v-if="item">
            <div class="text-lg font-medium">{{ item.itemName }} </div>
            <div class="mt-4">
                {{ item.itemDescription }}
            </div>
            <div class="mt-2 text-xs">
                {{ item.itemLore }}
            </div>
        </div>
    </tippy>
</template>

<script>
export default {
    props: {
        item: {}
    }
}
</script>

<style></style>