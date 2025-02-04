<script setup lang="ts">
import { ref } from 'vue'
import { literals } from '@/i18n/literals'
import SignUpForm from './SignUpForm.vue'
import SignUpLoginLink from './SignUpLoginLink.vue'
import type { SignUpFormData } from '@/types/signup'

const isSuccess = ref<boolean>(false)
const formData = ref<SignUpFormData | null>(null)
const errorMessage = ref<string | null>(null)

const handleFormSuccess = (data: SignUpFormData) => {
  isSuccess.value = true
  formData.value = data
  errorMessage.value = null
}

const handleFormError = (error: string) => {
  isSuccess.value = false
  formData.value = null
  errorMessage.value = error
}
</script>

<template>
  <provet-stack style="max-inline-size: 340px; margin: var(--n-space-xl) auto" padding="l">
    <provet-banner v-if="isSuccess" shadow variant="success">
      {{ literals.signUp.registration.thanks }}
      <template v-if="formData?.receiveUpdates">
        <br />
        {{ literals.signUp.registration.willUpdate }}
      </template>
    </provet-banner>
    <template v-else>
      <provet-card padding="l">
        <h1 slot="header" class="n-font-size-l">{{ literals.signUp.title }}</h1>
        <provet-stack>
          <p>{{ literals.signUp.subtitle }}</p>
          <SignUpForm @success="handleFormSuccess" @error="handleFormError" />
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </provet-stack>
      </provet-card>

      <SignUpLoginLink />
    </template>
  </provet-stack>
</template>
