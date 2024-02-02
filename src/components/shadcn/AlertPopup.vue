<script setup>
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

const prop = defineProps({
    description: {
        type: String,
        default: 'Do you want to delete this build?'
    }
})

const emits = defineEmits(['continue', 'cancel'])
</script>

<template>
    <AlertDialog>
        <AlertDialogTrigger>
            <slot></slot>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    {{ description }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="emits('cancel')">Cancel</AlertDialogCancel>
                <AlertDialogAction @click="emits('continue')">Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>