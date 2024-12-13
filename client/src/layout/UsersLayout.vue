<template>
  <v-responsive
    class="border rounded"
  >
    <v-app>
      <v-app-bar
        title="Beauty help"
        @click="$router.push('/')"
      >
        <template #append>
          <div class="d-flex flex-column mr-2">
            <span>
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7W6mLzWzyvqjcwfWJLW1uGM6G-dAsfgtFzw&s"
              />
            </template>
          </v-img>
        </template>
      </v-app-bar>

      <v-navigation-drawer
        class="bg-deep-purple"
        theme="dark"
        permanent
      >
        <v-list
          nav
        >
          <v-list-item
            prepend-icon="mdi-package-variant"
            title="Склад"
            value="storage"
            @click="$router.push('/storage')"
          />
          <v-list-item
            prepend-icon="mdi-room-service"
            title="Услуги"
            value="services"
            @click="$router.push('/services')"
          />
          <v-list-item
            prepend-icon="mdi-account"
            title="Сотрудники"
            value="employee"
            @click="$router.push('/employee')"
          />
        </v-list>

        <template #append>
          <div class="pa-2">
            <v-btn
              block
              @click="authStore.logout()"
            >
              Logout
            </v-btn>
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
