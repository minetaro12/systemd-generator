<script setup lang="ts">
const values = defineModel<string[]>();
const props = defineProps<{
  label: string;
  placeholder?: string;
}>();
</script>

<template>
  <fieldset v-if="values">
    <legend>{{ label }}</legend>
    <nav v-for="(_, i) in values">
      <div class="field border max">
        <input type="text" v-model="values[i]" :placeholder="placeholder" />
      </div>
      <button class="circle transparent" @click="values.splice(i, 1)">
        <i>delete</i>
      </button>
    </nav>
    <nav>
      <button class="circle small transparent" @click="values.push('')">
        <i>add</i>
      </button>
    </nav>
  </fieldset>
</template>
