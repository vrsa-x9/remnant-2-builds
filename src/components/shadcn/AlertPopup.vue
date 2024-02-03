<script setup>
import { ref } from 'vue'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '~/components/shadcn/ui/alert-dialog'

import { Input } from '@/components/shadcn/ui/input'
import { Label } from '@/components/shadcn/ui/label'

const prop = defineProps({
    title: {
        type: String,
        default: 'Delete this build'
    },
    description: {
        type: String,
        default: 'Are you sure do you want to delete this build?'
    }
})

const emits = defineEmits(['continue', 'cancel']);

const input_text = ref('');
</script>

<template>
    <AlertDialog>
        <AlertDialogTrigger>
            <slot></slot>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ title }}</AlertDialogTitle>
                <AlertDialogDescription>
                    {{ description }}
                </AlertDialogDescription>
                <slot name="content"></slot>
                <Input id="link" v-model="input_text" placeholder="Type confirm to proceed" />

            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="emits('cancel')">Cancel</AlertDialogCancel>
                <AlertDialogAction :disabled="input_text.toLowerCase() !== 'confirm'" @click="emits('continue')">Continue
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>