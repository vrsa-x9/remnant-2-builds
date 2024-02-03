<script setup>
import { computed } from 'vue'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'

const props = defineProps({
    versions: {
        type: Array
    },
    modelValue: { type: String, required: false },
});


const emits = defineEmits(["update:modelValue"]);

const selected_version = computed({
    // getter
    get() {
        return props.modelValue;
    },
    // setter
    set(newValue) {
        emits("update:modelValue", newValue)
    }
})


</script>

<template>
    <Select v-model="selected_version">
        <SelectTrigger>
            <SelectValue :placeholder="'Select a version'" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Version</SelectLabel>
                <SelectItem v-for="version in versions" :key="version" :value="version">
                    {{ version }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>