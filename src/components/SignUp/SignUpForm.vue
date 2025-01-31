<script setup lang="ts">
import { ref, computed, withDefaults, defineProps, defineEmits } from 'vue'
import type { SignUpFormData, SignUpFormErrors } from '@/types/signup'
import type { ToastMessage } from '@/types/toast'
import { literals } from '@/i18n/literals'

const props = withDefaults(
  defineProps<{
    isLoading: boolean
  }>(),
  {
    isLoading: false,
  }
)

const emit = defineEmits<{
  submit: [form: SignUpFormData]
  'toast-requested': [toastMessage: ToastMessage]
}>()

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
const passwordType = computed(() => (showPassword.value ? 'text' : 'password'))

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const toggleReceiveUpdates = () => {
  signUpForm.value.receiveUpdates = !signUpForm.value.receiveUpdates
}

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
    signUpForm.value.email.trim() !== '' &&
    signUpForm.value.password.trim() !== '' &&
    !props.isLoading
}

const handleSubmit = async () => {
  if (!isValidForm.value) return

  showPassword.value = false
  emit('submit', signUpForm.value)
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
        :loading="props.isLoading"
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
