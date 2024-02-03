<script setup >
import { Copy } from 'lucide-vue-next'
import { Button } from '@/components/shadcn/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/shadcn/ui/dialog'
import { Input } from '@/components/shadcn/ui/input'
import { Label } from '@/components/shadcn/ui/label'
import { useToast } from "@/components/shadcn/ui/toast/use-toast"

const { toast } = useToast()

const prop = defineProps({
    url: {
        type: String,
    },
})


const link = prop.url || window.location.href;


const copyContent = async () => {
    try {
        await navigator.clipboard.writeText(link);
        toast({
            title: "Success!",
            description: "Link copied successfully",
        });
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

</script>

<template>
    <Dialog>
        <DialogTrigger as-child>
            <slot></slot>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                    Anyone who has this link will be able to view this.
                </DialogDescription>
            </DialogHeader>
            <div class="flex items-center space-x-2">
                <div class="grid flex-1 gap-2">
                    <Label for="link" class="sr-only">
                        Link
                    </Label>
                    <Input id="link" :default-value="link" read-only />
                </div>
                <Button @click="copyContent" type="submit" size="sm" class="px-3">
                    <span class="sr-only">Copy</span>
                    <Copy class="w-4 h-4" />
                </Button>
            </div>
            <DialogFooter class="sm:justify-start">
                <DialogClose as-child>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>