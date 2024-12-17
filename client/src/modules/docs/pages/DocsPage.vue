<template>
  <section>
    <h1>
      Руководство пользователя информационной системы салона красоты
    </h1>
    <section
      v-for="(item, i) in config"
      :key="i"
    >
      <div class="mt-8 mb-4">
        <div class="mb-4">
          <span
            class="text-h5 pb-2"
          >
            {{ item.title }}
          </span>
        </div>
        <template
          v-for="(content, j) in item.content"
        >
          <p
            v-if="content.component === 'text'"
            :key="`content${i}${j}`"
            class="mb-1"
          >
            {{ content.text }}
          </p>
          <p
            v-if="content.component === 'textPunkt'"
            :key="`content${i}${j}`"
            class="mb-1 ml-4"
          >
            {{ content.text }}
          </p>
          <p
            v-if="content.component === 'textPodPunkt'"
            :key="`content${i}${j}`"
            class="mb-1 ml-8"
          >
            {{ content.text }}
          </p>
        </template>
      </div>
    </section>
  </section>
</template>

<script>
import config from '../configs/docs.config';

export default {
  name: 'DocsPage',
  computed: {
    config() {
      return config();
    },
  },
};
</script>
