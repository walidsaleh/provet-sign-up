<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SignupForm, SignUpFormErrors } from '@/types/signup'
import { LOADING_TIMEOUT } from '@/constants'

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
