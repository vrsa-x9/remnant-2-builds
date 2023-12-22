<template>
    <transition>
        <router-view />
    </transition>
</template>
  
<static-query>
  query {
    metadata {
      siteName
      siteDescription
    }
  }
  </static-query>
  
<script>
import { provide } from 'vue'
import { createClient } from '@supabase/supabase-js'

export default {
    metaInfo() {
        return {
            title: this.$static.metadata.siteName,
            meta: [
                {
                    key: 'description',
                    name: 'description',
                    content: this.$static.metadata.siteDescription
                }
            ]
        }
    },
    setup() {
        const supabase = createClient('https://oztxoqanibwswcpcqfnp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96dHhvcWFuaWJ3c3djcGNxZm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMwMDE2OTIsImV4cCI6MjAxODU3NzY5Mn0.2PUUL4_8WYW-OOXNk_7kvF399IF65r52e-QmZtU0xbI')
        provide('supabase', supabase);
    }
}
</script>
  