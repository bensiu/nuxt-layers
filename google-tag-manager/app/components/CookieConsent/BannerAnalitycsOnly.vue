<script setup lang="ts">
import type { CookieConsentBanerProps } from '../../../types'

const props = withDefaults(
  defineProps<CookieConsentBanerProps>(),
  {
    expiredCookie: 'Twoje preferencje dotyczące plików cookie wygasły. Przejrzyj je&nbsp;ponownie.',
    title: 'Ta strona używa ciasteczek (cookies)',
    description: 'Używamy plików cookie, aby&nbsp;poprawić jakość przeglądania i&nbsp;świadczyć usługi na&nbsp;najwyższym poziomie. Dalsze korzystanie ze&nbsp;strony oznacza, że&nbsp;zgadzasz&nbsp;się na&nbsp;ich&nbsp;użycie.',
    acceptLabel: 'Zgoda',
    denyLabel: ''
  }
)

const {
  acceptCategories,
  hasUserMadeChoice,
  isConsentExpired
} = useGoogleTagManager(props.gtmId)

const showBanner = ref(!hasUserMadeChoice.value || isConsentExpired.value)
watch([hasUserMadeChoice, isConsentExpired], () => {
  showBanner.value = !hasUserMadeChoice.value || isConsentExpired.value
})



// const emit = defineEmits(['open-modal'])

// function handleOpenModal() {
//   emit('open-modal')
// }

function handleAccept() {
  acceptCategories(['analytics'])
  showBanner.value = false
}

// function handleDeny() {
//   denyAll()
//   showBanner.value = false
// }
</script>

<template>
  <div
    v-if="showBanner"
    :class="[
      'fixed bottom-6 left-4 right-4 h-fit bg-yellow-50 dark:bg-neutral-900',
      'p-3 rounded-xl shadow-xl z-50 border-2',
      'flex justify-between items-start gap-4'
    ]"
  >
    <div class="flex-grow">
      <!-- eslint-disable vue/no-v-html -->
      <p
        v-if="isConsentExpired"
        v-html="props.expiredCookie"
        class="text-sm text-center py-1 pb-4 border-b-1 mb-4 px-4"
      />
      <div class="flex flex-col sm:flex-row items-center">
        <UIcon
          name="i-lucide-cookie"
          class="w-12 h-12 hidden sm:flex"
        />
        <div
         class="px-2 sm:px-4 flex-1"
        >
          <h2 class="flex text-lg font-semibold pb-3">
            {{ props.title }} <span class="hidden sm:flex ml-2">🍪</span>
          </h2>
          <p
            class="text-xs text-gray-500 dark:text-gray-400 pb-4 sm:pb-1"
            v-html="props.description"
          />
        </div>
        <div
          class="flex gap-4"
        >
          <UButton
            color="primary"
            class="px-4 py-2 rounded-lg"
            @click="handleAccept"
          >
            {{ props.acceptLabel }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
