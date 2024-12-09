<template>
  <section class="users-page">
    <div class="d-flex justify-space-between">
      <h1>
        Склад
      </h1>
      <v-btn
        color="blue-darken-4"
        variant="flat"
        @click="storageStore.addMaterialModalView = true"
      >
        Добавить новый материал
      </v-btn>
    </div>

    <AddMaterialModal />
  </section>
</template>

<script setup>
import { useStorageStore } from '@/store/storageStore';
import AddMaterialModal from '@/modules/storage/components/AddMaterialModal.vue';

const storageStore = useStorageStore();
</script>

<style lang="sass" scoped>

</style>
