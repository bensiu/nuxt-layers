<script setup lang="ts" generic="T">
import type { ButtonProps, CheckboxProps, FormSubmitEvent } from '@nuxt/ui'
import type { GenericSchema, InferOutput } from 'valibot'
import { safeParse } from 'valibot'

interface FieldItem {
  label?: string
  type: string
  name: string
  class?: string
  placeholder?: string
  required?: boolean
  items?: string[]
  rows?: number
  checkboxLabel?: string
}

interface ContactFormCardProps {
  icon?: string
  title: string

  schema: GenericSchema<T>
  fields: FieldItem[]
  default: { [key: string]: string | number | boolean }
  isSubmitting: boolean
  buttonLabel: string
  ui?: {
    checkbox: CheckboxProps
    button: ButtonProps
  }
}

const props = defineProps<ContactFormCardProps>()
const emits = defineEmits<{ submit: [value: InferOutput<typeof props.schema>] }>()

const state = reactive(props.default)

async function _handleSubmit(event: FormSubmitEvent<InferOutput<typeof props.schema>>) {
  emits('submit', event.data)
}
</script>

<template>
  <UForm
    :schema="props.schema"
    :state="(state as Partial<T>)"
    class="space-y-4"
    @submit="_handleSubmit"
  >
    <h3 class="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
      <UIcon
        v-if="props.icon"
        :name="props.icon"
        class="h-6 w-6 text-primary-500"
      />
      {{ props.title }}
    </h3>

    <div class="grid grid-cols-12 gap-4">
      <UFormField
        v-for="field in props.fields"
        :key="field.name"
        :label="field.label"
        :name="field.name"
        :required="field.required"
        :class="['w-full col-span-12 sm:col-span-12', field.class ?? '']"
      >
        <UInput
          v-if="['text', 'tel'].includes(field.type)"
          v-model="state[field.name]"
          :placeholder="field.placeholder"
          class="w-full"
        />
        <USelect
          v-else-if="['select'].includes(field.type)"
          v-model="(state[field.name] as string | undefined)"
          size="lg"
          :items="field.items"
          class="w-full"
        />
        <UTextarea
          v-else-if="['textarea'].includes(field.type)"
          v-model="(state[field.name] as string | undefined)"
          :placeholder="field.placeholder"
          :rows="field.rows"
          class="w-full"
        />
        <UCheckbox
          v-else-if="['checkbox'].includes(field.type)"
          v-model="(state[field.name] as boolean | undefined)"
          required
          color="secondary"
          size="xl"
          v-bind="props.ui?.checkbox || {}"
        >
          <template #label>
            <span class="text-sm leading-tight ml-2">
              {{ field.checkboxLabel }}
            </span>
          </template>
        </UCheckbox>
      </UFormField>

      <slot name="submit">
        <UButton
          type="submit"
          size="xl"
          block
          :loading="props.isSubmitting"
          color="secondary"
          :class="`col-span-12 sm:col-span-12 font-bold text-lg shadow-lg ${props.ui?.button?.class || ''}`"
          :disabled="!safeParse(props.schema, state).success"
          v-bind="props.ui?.button || {}"
        >
          {{ props.buttonLabel }}
        </UButton>
      </slot>
    </div>
  </UForm>
</template>
