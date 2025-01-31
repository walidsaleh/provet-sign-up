<!-- src/components/SignUpSuccess.vue -->
<script setup lang="ts">
import { literals } from '@/i18n/literals'

const props = defineProps<{
  receiveUpdates: boolean
}>()
</script>

<template>
  <provet-banner shadow variant="success">
    {{ literals.signUp.registration.thanks }}
    <template v-if="receiveUpdates">
      <br />
      {{ literals.signUp.registration.willUpdate }}
    </template>
  </provet-banner>
</template>
