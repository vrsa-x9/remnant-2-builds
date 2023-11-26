<script>
import Stats from '~/components/Stats.vue'
import Effects from '~/components/Effects.vue'
import ItemPicker from '~/components/ItemPicker.vue'

export default {
  metaInfo: {
    title: 'My Builds'
  },
  components: {
    Stats, Effects, ItemPicker
  },
  data() {
    return {
      isActive:false,
      selection: null,
      build_name:'',
      build:{

      },
    }
  },
  methods:{
    selectItem(item) {
      this.build[this.selection] = item;
      this.selection = null;
    }
  }
}


</script>

<template>
  <Layout>
    <div class="h-full" style="background: radial-gradient(#121313 65%, #1a1f1f);">
      <div class="grid  justify-center items-center h-full" style="grid-template-columns:1fr 300px 250px 300px 1fr;">
        <Stats></Stats>
        <div class="relative h-full rings">
          <div class="border-l ring-background left" style="background:transparent;"></div>
          <div class="absolute w-28 h-28 rounded-full border border-gray-800 hover:border-white cursor-pointer"
            style="top:30px;right:50px;"></div>
          <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:170px;right:150px;" ></div>
          <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:270px;right:185px;"></div>
          <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:370px;right:210px;"></div>
          <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:470px;right:185px;"></div>
          <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:570px;right:150px;" @click="selection = 'Relics'">
            <g-image v-if="build.Relics" :src="build.Relics.itemImageLinkFullPath" style="width:100%;"  />
            </div>
          <div class="absolute w-40 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:670px;right:-20px;" @click="selection = 'LongGuns'" >
            <g-image v-if="build.LongGuns" :src="build.LongGuns.itemImageLinkFullPath" style="width:100%;"  />
            </div>
        </div>
        <div class="relative h-full rings z-2"> 
          <g-image src="~/assets/remnant.webp" width="500" style="margin-top:150px;" />
          <div class="input mt-10 w-full" :class="{'active':isActive}">
            <input v-model="build_name" type="text" class="text-gray-300 font-medium text-xl" placeholder="Enter build name here"  @focus="isActive = true" @blur="isActive = false"  />
          </div>
          <button class="w-full mt-4" v-if="build_name.length>0"> Create new build</button>
          <div class="absolute w-40 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:670px;left:45px;"  @click="selection = 'Melee'" >
            <g-image v-if="build.Melee" :src="build.Melee.itemImageLinkFullPath" style="width:100%;"  />
            </div>
        </div>
        <div class="relative h-full rings">
          <div class="border-r ring-background right pointer-events-none" style="background:transparent"></div>
          <div class="absolute w-28 h-28 rounded-full border border-gray-800 hover:border-white cursor-pointer"
            style="top:30px;left:50px;"></div>
          <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:170px;left:150px;"  @click="selection = 'Amulet'">
              <g-image v-if="build.Amulet" :src="build.Amulet.itemImageLinkFullPath" style="width:100%;"  />
            </div>
          <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:270px;left:185px;" @click="selection = 'Ring1'">
            <g-image v-if="build.Ring1" :src="build.Ring1.itemImageLinkFullPath" style="width:100%;"  />

            </div>
          <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:370px;left:210px;" @click="selection = 'Ring2'">
            <g-image v-if="build.Ring2" :src="build.Ring2.itemImageLinkFullPath" style="width:100%;"  />

            </div>
          <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:470px;left:185px;" @click="selection = 'Ring3'">
              <g-image v-if="build.Ring3" :src="build.Ring3.itemImageLinkFullPath" style="width:100%;"  />
            </div>
          <div class="absolute w-20 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:570px;left:150px;" @click="selection = 'Ring4'">
              <g-image v-if="build.Ring4" :src="build.Ring4.itemImageLinkFullPath" style="width:100%;"  />
            </div>
          <div class="absolute w-40 h-20 border border-gray-800 rounded hover:border-white cursor-pointer"
            style="top:670px;left:-20px;" @click="selection = 'handGuns'" >
              <g-image v-if="build.handGuns" :src="build.handGuns.itemImageLinkFullPath" style="width:100%;"  />
            </div>
        </div>
        <Effects>
        </Effects>
      </div>
    </div>
    <ItemPicker v-if="selection" :selected_item="selection" :is_weapon="['Melee','handGuns','LongGuns'].includes(selection)" @close="selection=null" @select-item="selectItem"></ItemPicker>
  </Layout>
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
