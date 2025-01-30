<script setup lang="ts">
import { ref, computed } from 'vue'
import { LOADING_TIMEOUT } from '@/constants'
import type { SignUpForm, SignUpFormErrors } from '@/types/signup'
import type { ToastMessage } from '@/types/toast'

const emit = defineEmits<{
  'toast-requested': [toastMessage: ToastMessage]
}>()

const signUpForm = ref<SignUpForm>({
  email: '',
  password: '',
  receiveUpdates: false,
})

const signUpFormErrors = ref<SignUpFormErrors>({
  email: undefined,
  password: undefined,
})

const showPassword = ref<boolean>(false)
const passwordType = computed(() => (showPassword.value ? 'text' : 'password'))

const isLoading = ref<boolean>(false)
const isSuccess = ref<boolean>(false)

// minimal validation, this could be moved to a utils function
const validateEmail = () => {
  signUpFormErrors.value.email = signUpForm.value.email?.trim() ? undefined : 'Email is required'
  validateForm()
}

const validatePassword = () => {
  signUpFormErrors.value.password = signUpForm.value.password?.trim()
    ? undefined
    : 'Password is required'
  validateForm()
}

const isValidForm = ref<boolean>(false)

const validateForm = () => {
  isValidForm.value = 
    !signUpFormErrors.value.email &&
    !signUpFormErrors.value.password &&
    !!signUpForm.value.email?.trim() &&
    !!signUpForm.value.password?.trim()
}

// Form submission
const handleSubmit = async () => {
  if (!isValidForm.value) return

  showPassword.value = false
  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, LOADING_TIMEOUT))
    isSuccess.value = true
    emit('toast-requested', {
      message: 'Successful registration! Welcome to Provet',
      variant: 'default',
    })
  } catch (error) {
    emit('toast-requested', {
      message:
        (error as Error).message ||
        'There was an error processing your registration. Please try again',
      variant: 'danger',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <provet-stack
    class="sign-up-stack"
    direction="vertical"
    align-items="center"
    justify-content="center"
  >
  </provet-stack>
</template>

<style scoped>
.sign-up-stack {
  inline-size: 90%;
  max-inline-size: 600px;
  margin: var(--n-space-xl) auto;
  row-gap: var(--n-space-xl);
}
</style>
