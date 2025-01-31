<!-- src/components/SignUpStack.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SignUpFormData } from '@/types/signup'
import type { ToastMessage } from '@/types/toast'
import { LOADING_TIMEOUT } from '@/constants'
import { literals } from '@/i18n/literals'

import SignUpForm from './SignUpForm.vue'
import SignUpSuccess from './SignUpSuccess.vue'
import SignUpLoginLink from './SignUpLoginLink.vue'

const emit = defineEmits<{
  'toast-requested': [toastMessage: ToastMessage]
}>()

const isLoading = ref<boolean>(false)
const isSuccess = ref<boolean>(false)
const signUpForm = ref<SignUpFormData>({
  email: '',
  password: '',
  receiveUpdates: false,
})
const signUpFormRef = ref<InstanceType<typeof SignUpForm> | null>(null)

const handleSubmit = async (form: SignUpFormData) => {
  isLoading.value = true
  signUpForm.value = form

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

const validateEmail = () => {
  return signUpFormRef.value?.validateEmail()
}

const validatePassword = () => {
  return signUpFormRef.value?.validatePassword()
}

defineExpose({
  isLoading,
  isSuccess,
  validateEmail,
  validatePassword,
  signUpForm,
  isValidForm: computed(() => signUpFormRef.value?.isValidForm ?? false),
  signUpFormErrors: computed(() => signUpFormRef.value?.signUpFormErrors ?? { email: undefined, password: undefined }),
})
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
      <SignUpSuccess v-if="isSuccess" :receive-updates="signUpForm.receiveUpdates" />

      <template v-else>
        <provet-card padding="l">
          <h1 slot="header" class="n-font-size-l">{{ literals.signUp.title }}</h1>
          <provet-stack>
            <p>{{ literals.signUp.subtitle }}</p>
            <SignUpForm 
              ref="signUpFormRef"
              @submit="handleSubmit" 
              :is-loading="isLoading" 
            />
          </provet-stack>
        </provet-card>

        <SignUpLoginLink />
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

  .provet-cloud-logo {
    max-block-size: var(--n-space-xl);
  }
}
</style>
