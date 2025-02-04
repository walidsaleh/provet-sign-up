<script setup lang="ts">
import { ref, provide } from 'vue'
import SignUpStack from '@/components/SignUp/SignUpStack.vue'
import { literals } from '@/i18n/literals'
import type { ToastMessage } from '@/types/toast'

const emptyToastMessage: ToastMessage = { message: '', variant: 'default' }
const toastMessage = ref<ToastMessage>(emptyToastMessage)

const hideToast = () => (toastMessage.value = emptyToastMessage)
const displayToast = (toastMessageObject: ToastMessage) => (toastMessage.value = toastMessageObject)

provide('displayToast', displayToast)
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
    <SignUpStack />
  </provet-stack>
  <provet-toast-group @dismiss="hideToast">
    <provet-toast
      v-if="toastMessage.message"
      :key="toastMessage.message"
      :variant="toastMessage.variant"
    >
      {{ toastMessage.message }}
    </provet-toast>
  </provet-toast-group>
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
