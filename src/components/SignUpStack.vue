<script setup lang="ts">
import { ref, computed } from 'vue'
import { LOADING_TIMEOUT } from '@/constants'
import type { SignUpForm, SignUpFormErrors } from '@/types/signup'
import type { ToastMessage } from '@/types/toast'
import { literals } from '@/i18n/literals'

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
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
const toggleReceiveUpdates = () => {
  signUpForm.value.receiveUpdates = !signUpForm.value.receiveUpdates
}

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
      message: literals.signUp.registration.success,
      variant: 'default',
    })
  } catch (error) {
    emit('toast-requested', {
      message: (error as Error).message || literals.signUp.registration.error,
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
    <img
      class="provet-cloud-logo"
      :alt="literals.signUp.logoAlt"
      src="/provet_cloud_new_logo_570x80.png"
    />
    <provet-stack style="max-inline-size: 340px; margin: var(--n-space-xl) auto" padding="l">
      <provet-banner v-if="isSuccess" shadow variant="success"
        >{{ literals.signUp.registration.thanks }}
        <template v-if="signUpForm.receiveUpdates">
          <br />
          {{ literals.signUp.registration.willUpdate }}
        </template>
      </provet-banner>

      <template v-else>
        <provet-card padding="l">
          <h1 slot="header" class="n-font-size-l">{{ literals.signUp.title }}</h1>
        </provet-card>
      </template>
    </provet-stack>
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
