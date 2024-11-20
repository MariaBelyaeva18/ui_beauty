<template>
  <section>
    {{ `Привет, ${user.name}! Это твой личный кабинет,
      в котором ты можешь управлять своими записями.` }}
    {{ `Твоя роль -  ${main.roles.find((el) => el.id === user.role_id).role}.` }}
  </section>
</template>

<script>

import { store } from '@/store';

export default {
  name: 'UsersPage',
  data() {
    return {
      main: store(),
      user: JSON.parse(localStorage.getItem('user')),
    };
  },
};
</script>
