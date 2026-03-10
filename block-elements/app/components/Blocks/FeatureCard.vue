<script setup lang="ts">
type FeatureCardItem = {
  icon?: string
  title: string
  description?: string
  items?: string[]
  link?: string
  ui?: {
    title?: string
  }
}
const props = defineProps<FeatureCardItem>()
</script>

<template>
  <div
    :class="[
      'bg-white dark:bg-gray-800',
      'p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow',
      'border border-gray-100 dark:border-gray-700',
      'transition-all duration-300 group'
    ]"
  >
    <div
      v-if="props.icon"
      :class="[
        'min-h-12 h-12 w-12 bg-primary-500/10 rounded-lg',
        'flex items-center justify-center',
        'text-primary-500 mb-3',
        'group-hover:scale-110 transition-transform'
      ]"
    >
      <slot name="icon">
        <UIcon
          v-if="props.icon"
          :name="props.icon"
          class="h-6 w-6 p-2"
        />
      </slot>
    </div>

    <!-- eslint-disable vue/no-v-html -->
    <h3
      :class="[
        'text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors min-h-16',
        props.ui?.title ? props.ui?.title : ''
      ]"
      v-html="props.title"
    />

    <p
      v-if="props.description"
      class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed"
      v-html="props.description"
    />

    <slot name="list">
      <div class="w-full text-left">
        <ul
          v-if="props.items?.length"
          :class="`space-y-1 py-3 ${props.link ? 'mb-2' : ''}`"
        >
          <li
            v-for="(item, index) in props.items"
            :key="`item-${index}`"
            class="text-sm text-(--ui-text-muted) flex items-center gap-2"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-(--ui-primary)/60" />
            {{ item }}
          </li>
        </ul>
      </div>
    </slot>

    <slot name="link">
      <div
        v-if="props.link"
        class="h-full"
      />
      <div
        v-if="props.link"
        class="flex items-center text-primary font-semibold text-sm group-hover:gap-3 gap-2 transition-all"
      >
        {{ props.link }}
        <UIcon
          name="lucide-arrow-right"
          class="h-4 w-4 transition-transform group-hover:translate-x-1"
        />
      </div>
    </slot>
  </div>
</template>
