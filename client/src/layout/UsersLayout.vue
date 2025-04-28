<template>
  <v-responsive
    class="border rounded"
  >
    <v-app>
      <v-app-bar
        class="bg-amber"
        title="Название салона красоты"
        @click="$router.push('/')"
      >
        <template #append>
          <div class="d-flex flex-row mr-2">
            <span class="mr-2">
              {{ mainStore.form.name }}
            </span>
            <span>
              {{ mainStore.form.last_name }}
            </span>
          </div>
          <v-chip class="mr-2">
            {{ mainStore.form.role_name }}
          </v-chip>

          <v-img
            class="avatar"
            :src="getAvatarSrc"
            cover
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  color="grey-lighten-4"
                  indeterminate
                />
              </div>
            </template>
            <template #error>
              <v-img
                src="https://img.freepik.com/premium-vector/avatar-icon_791764-3410.jpg"
              />
            </template>
          </v-img>
          <v-btn
            @click="authStore.logout()"
          >
            <v-icon
              icon="mdi-logout"
            />
          </v-btn>
        </template>
      </v-app-bar>

      <v-navigation-drawer
        class="bg-green"
        theme="dark"
        permanent
      >
        <v-list
          nav
        >
          <v-list-item
            v-if="mainStore.form.role_name === 'Управляющий'"
            prepend-icon="mdi-package-variant"
            title="Склад"
            value="storage"
            @click="$router.push('/storage')"
          />
          <v-list-item
            v-if="mainStore.form.role_name === 'Управляющий'"
            prepend-icon="mdi-room-service"
            title="Услуги"
            value="services"
            @click="$router.push('/services')"
          />
          <v-list-item
            v-if="mainStore.form.role_name === 'Управляющий'"
            prepend-icon="mdi-account"
            title="Сотрудники"
            value="employee"
            @click="$router.push('/employee')"
          />
          <v-list-item
            v-if="mainStore.form.role_name !== 'Клиент'"
            prepend-icon="mdi-calendar"
            title="График отсутствий"
            value="calendar"
            @click="$router.push('/calendar')"
          />
          <v-list-item
            prepend-icon="mdi-archive-plus-outline"
            title="Заказы"
            value="orders"
            @click="$router.push('/orders')"
          />
        </v-list>

        <template #append>
          <div class="pa-2 d-flex flex-column align-center">
            <a
              href="/docs"
            >Руководство пользователя</a>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useMainStore } from '@/store/mainStore';

const authStore = useAuthStore();
const mainStore = useMainStore();

const getAvatarSrc = computed(() => `${import.meta.env.VITE_API_URL}/${mainStore.avatarPath}`);

onMounted(() => {
  mainStore.getUserInfo();
});
</script>

<style lang="sass" scoped>
.avatar
  width: 40px
  height: 40px
  border-radius: 50%
</style>
