<script setup lang="ts">
import type { ProcessStep } from '~/types'

const props = defineProps<{ steps: ProcessStep[] }>()
</script>

<template>
  <div :class="`grid grid-cols-1 md:grid-cols-${props.steps.length} gap-16`">
    <div
      v-for="(item, idx) in props.steps"
      :key="idx"
      class="relative z-10 flex flex-col items-center text-center group"
    >
      <div
        v-if="item.icon"
        class="h-16 w-16 bg-primary-500/10 rounded-full flex items-center justify-center text-primary-500 mb-4 group-hover:scale-110 transition-transform shadow-xl"
      >
        <UIcon
          :name="item.icon"
          class="h-8 w-8"
        />
      </div>
      <div
        v-else
        class="h-16 w-16 bg-primary-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300 text-white"
      >
        {{ item.step || idx + 1 }}
      </div>

      <h3 class="text-xl font-semibold mb-2">
        {{ item.title }}
      </h3>

      <!-- eslint-disable vue/no-v-html -->
      <p
        class="text-sm leading-relaxed"
        v-html="item.description"
      />
    </div>
  </div>
</template>
