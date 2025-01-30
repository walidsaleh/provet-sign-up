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
