<script setup lang="ts">
const value = defineModel<string | number>();
const props = defineProps<{
  label: string;
  placeholder?: string;
}>();
</script>

<template>
  <div class="field border label">
    <input type="text" v-model="value" :placeholder="placeholder" />
    <label>{{ label }}</label>
  </div>
</template>
