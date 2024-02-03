<script setup>
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/shadcn/ui/popover'
import { Button } from '@/components/shadcn/ui/button'

import { get_credentials } from '~/lib/auth.js'
const credential = get_credentials();

const logout = () => {
    window.localStorage.removeItem('credential');
    window.location.reload();
}
</script>

<template>
    <Popover>
        <PopoverTrigger>
            <slot></slot>
        </PopoverTrigger>
        <PopoverContent>
            <div class="text-xl font-semibold">
                Welcome
            </div>
            <div>
                Hi {{ credential.name }}, do you want to log out?
            </div>
            <div class="text-right">
                <Button @click="logout">
                    Logout
                </Button>
            </div>
        </PopoverContent>
    </Popover>
</template>