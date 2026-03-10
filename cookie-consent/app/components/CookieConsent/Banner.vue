<script setup lang="ts">
import type { CookieBanerProps } from '~/types'

const {
  acceptAll,
  denyAll,
  hasUserMadeChoice,
  isConsentExpired
  // onConsentAccepted,
  // onConsentDenied,
  // onCategoryAccepted,
  // onScriptsInjected,
  // onScriptsRemoved,
} = useCookieConsent()

const showBanner = ref(!hasUserMadeChoice.value || isConsentExpired.value)
watch([hasUserMadeChoice, isConsentExpired], () => {
  showBanner.value = !hasUserMadeChoice.value || isConsentExpired.value
})

const props = defineProps<CookieBanerProps>()

// const emit = defineEmits(['open-modal'])

// function handleOpenModal() {
//   emit('open-modal')
// }

function handleAccept() {
  acceptAll()
  showBanner.value = false
}

function handleDeny() {
  denyAll()
  showBanner.value = false
}
</script>

<template>
  <div
    v-if="showBanner"
    :class="[
      'fixed bottom-6 left-6 right-6 bg-white dark:bg-neutral-900',
      'p-4 rounded-xl shadow-xl z-50 border-2',
      'flex flex-col md:flex-row justify-between items-start gap-4'
    ]"
  >
    <div class="flex-1">
      <!-- eslint-disable vue/no-v-html -->
      <p
        v-if="isConsentExpired"
        v-html="props.expiredCookie"
      />
      <h2 class="text-lg font-semibold">
        {{ props.title }} 🍪
      </h2>
      <p
        class="text-sm text-gray-500 dark:text-gray-400"
        v-html="props.description"
      />
    </div>
    <div
      class="flex gap-4"
    >
      <UButton
        color="neutral"
        class="px-4 py-2 rounded-lg"
        @click="handleDeny"
      >
        {{ props.deny }}
      </UButton>
      <UButton
        color="primary"
        class="px-4 py-2 rounded-lg"
        @click="handleAccept"
      >
        {{ props.accept }}
      </UButton>
      <!-- <UButton
        variant="link"
        @click="handleOpenModal"
      >
        Customize
      </UButton> -->
    </div>
  </div>
</template>
