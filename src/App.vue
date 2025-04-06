<script setup lang="ts">
import "beercss";
import "material-dynamic-colors";
import Header from "./components/Header.vue";
import { onMounted, ref, watch } from "vue";
import type Template from "./types/Template";
import { generate } from "./lib/generate";
import Input from "./components/Input.vue";
import InputMulti from "./components/InputMulti.vue";
import Select from "./components/Select.vue";

const darkMode = ref(ui("mode") === "dark" ? true : false);
const accentColor = ref<string>("#00aaff");

watch(darkMode, (val) => {
  if (val) {
    ui("mode", "dark");
  } else {
    ui("mode", "light");
  }
});

watch(accentColor, (val) => {
  ui("theme", val);
  localStorage.setItem("accentColor", val);
});

const result = ref("");
const template = ref<Template>({
  Unit: {
    Description: "Sample Unit File",
    After: ["network.target"],
    Before: [],
  },
  Service: {
    Type: "simple",
    Restart: "always",
    ExecStart: ["/usr/bin/your-command"],
    ExecStop: [],
    ExecReload: [],
    Environment: [],
    EnvironmentFile: [],
  },
  Install: {
    WantedBy: "multi-user.target",
  },
});

const showSnackbar = ref(false);
function handleCopy() {
  navigator.clipboard.writeText(result.value).then(() => {
    showSnackbar.value = true;
    setTimeout(() => {
      showSnackbar.value = false;
    }, 2000);
  });
}

function handleSave() {
  const blob = new Blob([result.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "unit-file.service";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

onMounted(() => {
  result.value = generate(template.value);
  const storedAccentColor = localStorage.getItem("accentColor");
  if (storedAccentColor) {
    accentColor.value = storedAccentColor;
  }
});

watch(
  template,
  (newTemplate) => {
    result.value = generate(newTemplate);
  },
  { deep: true }
);
</script>

<template>
  <Header v-model:mode="darkMode" v-model:accent-color="accentColor" />
  <main class="responsive">
    <article>
      <button data-ui="#result" class="small-round">
        <i>code</i>
        <span>Show Code</span>
      </button>
      <button v-on:click="handleCopy" class="small-round">
        <i>content_copy</i>
        <span>Copy</span>
      </button>
      <button v-on:click="handleSave" class="small-round">
        <i>save</i>
        <span>Save</span>
      </button>
      <dialog id="result" class="small-round">
        <code>
          <pre>{{ result }}</pre>
        </code>
        <nav>
          <button data-ui="#result" class="small-round">
            <i>close</i>
            <span>Close</span>
          </button>
          <button v-on:click="handleCopy" class="small-round">
            <i>content_copy</i>
            <span>Copy</span>
          </button>
          <button v-on:click="handleSave" class="small-round">
            <i>save</i>
            <span>Save</span>
          </button>
        </nav>
      </dialog>
      <div class="snackbar" :class="showSnackbar ? 'active' : ''">Copied!</div>
      <fieldset>
        <legend>[Unit]</legend>
        <Input v-model="template.Unit.Description" label="Description" />
        <InputMulti v-model="template.Unit.After" label="After" />
        <InputMulti v-model="template.Unit.Before" label="Before" />
      </fieldset>
      <fieldset>
        <legend>[Service]</legend>
        <Select v-model="template.Service.Type" label="Type">
          <option value="simple">simple</option>
          <option value="forking">forking</option>
          <option value="oneshot">oneshot</option>
          <option value="dbus">dbus</option>
          <option value="notify">notify</option>
          <option value="idle">idle</option>
        </Select>
        <Select v-model="template.Service.Restart" label="Restart">
          <option value="no">no</option>
          <option value="always">always</option>
          <option value="on-failure">on-failure</option>
        </Select>
        <Input v-model="template.Service.RuntimeMaxSec" label="RuntimeMaxSec" />
        <Input v-model="template.Service.User" label="User" />
        <Input v-model="template.Service.Group" label="Group" />
        <InputMulti v-model="template.Service.ExecStart" label="ExecStart" />
        <InputMulti v-model="template.Service.ExecStop" label="ExecStop" />
        <InputMulti v-model="template.Service.ExecReload" label="ExecReload" />
        <InputMulti
          v-model="template.Service.Environment"
          label="Environment"
          placeholder="VAR=value"
        />
        <InputMulti
          v-model="template.Service.EnvironmentFile"
          label="EnvironmentFile"
        />
        <Input
          v-model="template.Service.WorkingDirectory"
          label="WorkingDirectory"
        />
      </fieldset>
      <fieldset>
        <legend>[Install]</legend>
        <Input v-model="template.Install.WantedBy" label="WantedBy" />
      </fieldset>
    </article>
  </main>
</template>

<style scoped></style>
