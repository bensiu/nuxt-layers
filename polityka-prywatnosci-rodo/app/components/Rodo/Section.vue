<script setup lang="ts">
interface RodoSectionProps {
  title: string
  description: string
  items?: string[]
}

const props = defineProps<RodoSectionProps>()
</script>

<template>
  <section>
    <h2
      class="text-2xl font-bold text-primary dark:text-primary flex items-center gap-2 not-prose mb-4"
      v-html="props.title"
    />
    <p
      class="text-sm sm:text-normal"
      v-html="props.description"
    />
    <ul
      v-if="props.items"
      class="list-disc pl-6 mt-2 text-sm sm:text-normal"
    >
      <li
        v-for="(item, index) in props.items"
        :key="`rodo-item-${props.title}-${index}`"
        v-html="item"
      />
    </ul>
  </section>
</template>
