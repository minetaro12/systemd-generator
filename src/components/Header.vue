<script setup lang="ts">
const darkMode = defineModel<boolean>("mode", { required: true });
const accentColor = defineModel<string>("accentColor", { required: true });
</script>

<template>
  <header class="fixed primary-container">
    <nav>
      <h6 class="max">Systemd Generator</h6>
      <button class="circle transparent" data-ui="#result">
        <i>code</i>
      </button>
      <button class="circle transparent">
        <i>palette</i>
        <input type="color" v-model="accentColor" />
      </button>
      <button class="circle transparent" v-on:click="darkMode = !darkMode">
        <i v-if="!darkMode">dark_mode</i>
        <i v-else>light_mode</i>
      </button>
    </nav>
  </header>
</template>
