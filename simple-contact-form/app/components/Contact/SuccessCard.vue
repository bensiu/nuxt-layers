<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

interface ContactSuccessCardProps {
  icon?: string
  title: string
  description: string
  backLabel: string
  ui?: {
    button: ButtonProps
  }
}
const props = defineProps<ContactSuccessCardProps>()
const emits = defineEmits<{ clicked: [value: boolean] }>()
</script>

<template>
  <div
    class="h-full flex flex-col items-center justify-center text-center py-12"
  >
    <div class="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
      <UIcon
        name="lucide-check-circle"
        class="h-12 w-12 text-primary"
      />
    </div>
    <!-- eslint-disable vue/no-v-html -->
    <h3
      class="text-2xl font-display font-bold mb-3"
      v-html="props.title"
    />
    <p
      class="text-muted-foreground mb-8 max-w-sm"
      v-html="props.description"
    />
    <UButton
      variant="soft"
      size="xl"
      v-bind="props.ui?.button ? props.ui.button : {}"
      @click="emits('clicked', true)"
    >
      {{ props.backLabel }}
    </UButton>
  </div>
</template>
