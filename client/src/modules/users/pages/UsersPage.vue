<template>
  <section>
    {{ `Привет, ${user.name}! Это твой личный кабинет,
      в котором ты можешь управлять своими записями.` }}
    {{ `Твоя роль -  ${main.roles.find((el) => el.id === user.role_id).role}.` }}
  </section>
</template>

<script setup>

import { ref } from 'vue';

const user = ref(JSON.parse(localStorage.getItem('user')));

</script>
