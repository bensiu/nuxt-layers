<script lang="ts" setup>
import type { SectionVariant } from '~/types'

interface SectionWrapperProps {
  id: string
  containerClass?: string
  variant?: SectionVariant
}

const props = withDefaults(
  defineProps<SectionWrapperProps>(),
  {
    variant: 'default'
  }
)
const variants = {
  subtle: 'section-subtle bg-secondary/30',
  primary: 'bg-primary-500',
  default: ''
}
</script>

<template>
  <UPageSection
    :id="props.id"
    :ui="{
      container: 'page-container py-8 sm:py-12 lg:py-16',
      root: variants[props.variant]
    }"
  >
    <div class="page-container animate-fade-up">
      <slot />
    </div>
  </UPageSection>
</template>
