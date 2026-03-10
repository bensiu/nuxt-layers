<script setup lang="ts">
const props = defineProps<{
  lead?: string
  title: string
  description?: string
  items?: string[]
  asH1?: boolean
  titleColor?: string
  descriptionColor?: string
  ui?: {
    title?: string
    description?: string
  }
}>()
</script>

<template>
  <div class="text-center max-w-4xl mx-auto mb-12 animate-fade-up">
    <span
      v-if="props.lead"
      class="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4"
    >
      {{ props.lead }}
    </span>
    <!-- eslint-disable vue/no-v-html -->
    <h1
      v-if="props.asH1"
      :class="[
        'text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-6',
        props.titleColor ? props.titleColor : 'text-primary',
        props.ui?.title ? props.ui?.title : ''
      ]"
      v-html="props.title"
    />
    <!-- eslint-disable vue/no-v-html -->
    <h2
      v-else
      :class="[
        'text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-6',
        props.titleColor ? props.titleColor : 'text-primary',
        props.ui?.title ? props.ui?.title : ''
      ]"
      v-html="props.title"
    />
    <!-- eslint-disable vue/no-v-html -->
    <p
      v-if="props.description"
      :class="[
        `text-lg ${props.descriptionColor || 'text-muted-foreground'}`,
        props.ui?.description ? props.ui?.description : ''
      ]"
      v-html="props.description"
    />
    <ul
      v-if="props.items?.length"
      class="space-y-4 mb-4 py-3"
    >
      <li
        v-for="(item, index) in props.items"
        :key="`item-${index}`"
        class="flex items-start gap-4"
      >
        <UIcon
          name="lucide-check-circle-2"
          class="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
        />
        <span v-html="item" />
      </li>
    </ul>
    <slot />
  </div>
</template>
