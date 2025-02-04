<script setup lang="ts">
import { ref, provide } from 'vue'
import SignUpStack from '@/components/SignUp/SignUpStack.vue'
import type { ToastMessage } from '@/types/toast'

const emptyToastMessage: ToastMessage = { message: '', variant: 'default' }
const toastMessage = ref<ToastMessage>(emptyToastMessage)

const hideToast = () => (toastMessage.value = emptyToastMessage)
const displayToast = (toastMessageObject: ToastMessage) => (toastMessage.value = toastMessageObject)

provide('displayToast', displayToast)
</script>

<template>
  <SignUpStack />
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
