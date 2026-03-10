<script setup lang="ts">
const props = defineProps<{ items: string[] }>()
</script>

<template>
  <ul class="grid gap-4 md:grid-cols-2">
    <li
      v-for="(item, index) in props.items"
      :key="`list-item-${index}`"
      class="flex items-start gap-4 bg-white/10 rounded-lg p-4"
    >
      <UIcon
        name="lucide-circle-check"
        class="h-6 w-6 text-[#eab308] flex-shrink-0 mt-0.5"
      />
      <!-- eslint-disable vue/no-v-html -->
      <span
        class="text-lg text-white"
        v-html="item"
      />
    </li>
  </ul>
</template>
