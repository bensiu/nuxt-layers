<script setup lang="ts">
interface RodoSecurityItemCardProps {
  title: string
  icon: string
  description: string
}

const props = defineProps<RodoSecurityItemCardProps>()
</script>

<template>
  <div
    class="bg-gray-100/50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col items-center text-center transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
  >
    <UIcon
      :name="props.icon"
      class="h-10 w-10 text-primary-500 mb-4"
    />

    <h2 class="font-bold mb-2 text-gray-900 dark:text-white">
      {{ props.title }}
    </h2>
    <p
      class="text-xs text-gray-500 dark:text-gray-400"
      v-html="props.description"
    />
  </div>
</template>
