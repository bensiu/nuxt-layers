// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FetchError } from 'ofetch'

interface UseContactFormOutput {
  isSubmitted: globalThis.Ref<boolean, boolean>
  isSubmitting: globalThis.Ref<boolean, boolean>
  isError: globalThis.Ref<boolean, boolean>
  handleSubmit: (event: unknown) => void
}

export default function (): UseContactFormOutput {
  const isSubmitted = ref(false)
  const isSubmitting = ref(false)
  const isError = ref(false)

  async function handleSubmit(event: unknown) {
    isSubmitting.value = true
    isError.value = false

    try {
      console.log('Event data', event)
      /* const response = */ await $fetch('/api/contact/', {
        method: 'POST',
        body: JSON.stringify(event)
      })

      // console.log('Server response:', response)
      isSubmitted.value = true
    } catch (error: FetchError | unknown) {
      // 4. Handle Error
      console.error(error)
      isError.value = true
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isSubmitted,
    isSubmitting,
    isError,
    handleSubmit
  }
}
