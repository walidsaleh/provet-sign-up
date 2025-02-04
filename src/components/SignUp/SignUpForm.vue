<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { literals } from '@/i18n/literals'
import { LOADING_TIMEOUT } from '@/constants'
import type { SignUpFormData, SignUpFormErrors } from '@/types/signup'
import type { ToastMessage } from '@/types/toast'

const emit = defineEmits(['success', 'error'])

const displayToast = inject<(toast: ToastMessage) => void>('displayToast')

const signUpForm = ref<SignUpFormData>({
  email: '',
  password: '',
  receiveUpdates: false,
})

const signUpFormErrors = ref<SignUpFormErrors>({
  email: undefined,
  password: undefined,
})

const showPassword = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const passwordType = computed(() => (showPassword.value ? 'text' : 'password'))

const emailTrimmed = computed(() => signUpForm.value.email.trim())
const passwordTrimmed = computed(() => signUpForm.value.password.trim())

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleReceiveUpdates = () => {
  signUpForm.value.receiveUpdates = !signUpForm.value.receiveUpdates
}

const validateEmail = () => {
  signUpFormErrors.value.email = emailTrimmed.value
    ? undefined
    : literals.signUp.validation.emailRequired
  validateForm()
}

const validatePassword = () => {
  signUpFormErrors.value.password = passwordTrimmed.value
    ? undefined
    : literals.signUp.validation.passwordRequired
  validateForm()
}

const isValidForm = ref<boolean>(false)

const validateForm = () => {
  isValidForm.value =
    !signUpFormErrors.value.email &&
    !signUpFormErrors.value.password &&
    !!emailTrimmed.value &&
    !!passwordTrimmed.value &&
    !isLoading.value
}

const handleSubmit = async () => {
  if (!isValidForm.value) return

  showPassword.value = false
  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, LOADING_TIMEOUT))
    displayToast?.({
      message: literals.signUp.registration.success,
      variant: 'default',
    })
    emit('success', signUpForm.value)
  } catch (error) {
    displayToast?.({
      message: (error as Error).message || literals.signUp.registration.error,
      variant: 'danger',
    })
    emit('error', (error as Error).message || literals.signUp.registration.error)
  } finally {
    isLoading.value = false
  }
}

defineExpose({
  isValidForm,
  passwordType,
  signUpForm,
  signUpFormErrors,
  validateEmail,
  validatePassword,
  showPassword,
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <provet-stack>
      <provet-input
        id="email"
        v-model="signUpForm.email"
        :label="literals.signUp.email.label"
        :placeholder="literals.signUp.email.placeholder"
        expand
        type="email"
        required
        :disabled="isLoading"
        :error="signUpFormErrors.email"
        @blur="validateEmail"
      ></provet-input>

      <provet-input
        id="password"
        v-model="signUpForm.password"
        :label="literals.signUp.password.label"
        :placeholder="literals.signUp.password.placeholder"
        expand
        :type="passwordType"
        required
        :disabled="isLoading"
        :error="signUpFormErrors.password"
        @blur="validatePassword"
      >
        <provet-icon
          v-show="signUpForm.password"
          class="unmask-icon"
          :name="showPassword ? 'interface-edit-off' : 'interface-edit-on'"
          size="s"
          slot="end"
          @click="togglePasswordVisibility"
        ></provet-icon>
      </provet-input>

      <provet-toggle
        :checked="signUpForm.receiveUpdates"
        :label="literals.signUp.keepUpdated"
        size="s"
        :disabled="isLoading"
        @change="toggleReceiveUpdates"
      ></provet-toggle>

      <provet-button
        type="submit"
        expand
        variant="primary"
        :disabled="!isValidForm"
        :loading="isLoading"
      >
        {{
          isLoading ? literals.signUp.submitButton.loading : literals.signUp.submitButton.default
        }}
      </provet-button>
    </provet-stack>
  </form>
</template>

<style scoped>
.unmask-icon {
  cursor: pointer;
  pointer-events: all;
}
</style>
