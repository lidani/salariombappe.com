<template>
  <h3>{{ $t('DisplayNameWithSalary') }}</h3>
  <p class="text-h4">{{ $t('SinceYouEntered') }}</p>
  <p class="text-h3">
    {{ $t('SinceBefore') }} {{ formatElapsedTime(spendTimeInSeconds) }}
    {{ $t('SinceAfter') }}
  </p>
  <p class="text-h4">
    <strong>{{ playerName }}</strong> {{ $t('Won') }}
  </p>
  <p class="text-h3">€ {{ format(current) }}</p>

  <template v-if="quota">
    <p class="text-h3">{{ $t('Or') }} {{ 'R$' }} {{ format(alternative) }}</p>
  </template>
</template>

<script lang="ts">
import axios from 'axios';
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  ref,
} from 'vue';
import { start, formatElapsedTime } from '@/timer';
import { SALARY_PER_SECOND_IN_EUR, format } from '@/salary';

export default defineComponent({
  name: 'HomePage',
  setup() {
    let stop: (() => void) | undefined;

    const current = ref(0),
      quota = ref(1);

    const spendTimeInSeconds = computed(
      () => current.value / SALARY_PER_SECOND_IN_EUR
    );

    const update = () => (current.value += SALARY_PER_SECOND_IN_EUR);

    onBeforeMount(() => {
      stop = start(update);
    });

    onBeforeUnmount(() => stop?.());

    const playerName = import.meta.env.VITE_APP_PLAYER_NAME;

    onBeforeMount(async () => {
      const { data } = await axios.get(
        'https://economia.awesomeapi.com.br/json/last/EUR-BRL'
      );

      quota.value = parseFloat((data?.EURBRL?.ask ?? 1).toString());
    });

    const alternative = computed(() => current.value * quota.value);

    return {
      alternative,
      current,
      quota,
      playerName,

      spendTimeInSeconds,

      formatElapsedTime,
      format,
      stop,
    };
  },
});
</script>
