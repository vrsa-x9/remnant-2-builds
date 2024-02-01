<template>
    <tippy :allowHTML="true" :trigger="item ? 'mouseenter' : 'manual'" arrow content-tag="div"
        content-class="content-wrapper">
        <template v-slot:default>
            <img v-if="item" :src="item.itemImageLinkFullPath" :style="`width:100%;height:${image?.height || 78}px;`"
                :class="image?.class" />
        </template>
        <template #content>
            <div v-if="item">
                <div class="text-lg font-medium">{{ item.itemName }} </div>
                <div class="mt-4">
                    {{ item.itemDescription }}
                </div>
                <div class="mt-2 text-xs">
                    {{ item.itemLore }}
                </div>
            </div>
        </template>
    </tippy>
</template>

<script>
export default {
    props: {
        item: {},
        image: {}
    }
}
</script>

<style></style>