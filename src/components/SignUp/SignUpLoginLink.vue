<script setup lang="ts">
import { literals } from '@/i18n/literals'
</script>

<template>
  <provet-card class="n-align-center">
    {{ literals.signUp.registration.allreadyRegistered }}
    <a
      :href="literals.signUp.registration.loginUrl"
      :title="literals.signUp.registration.loginTitle"
    >
      {{ literals.signUp.registration.logIn }}
    </a>
  </provet-card>
</template>
