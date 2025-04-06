<script setup lang="ts">
const value = defineModel<string>();
const props = defineProps<{
  label: string;
}>();
</script>

<template>
  <div class="field border label">
    <select v-model="value">
      <slot />
    </select>
    <label>{{ label }}</label>
  </div>
</template>
