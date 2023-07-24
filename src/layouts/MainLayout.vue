<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="text-black" style="background-color: transparent">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="mdi-github"
          aria-label="Menu"
          @click="onClickGithub"
        />

        <q-select
          v-model="locale"
          :options="localeOptions"
          dense
          class="q-ml-auto"
          borderless
          emit-value
          map-options
          options-dense
        />
      </q-toolbar>
    </q-header>

    <q-page-container class="q-pa-sm text-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const onClickGithub = () =>
      window.open('https://github.com/lidani/salariombappe.com', '_blank');

    const { locale } = useI18n({ useScope: 'global' });

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'pt-BR', label: 'Português' },
      ],
      onClickGithub,
    };
  },
});
</script>
