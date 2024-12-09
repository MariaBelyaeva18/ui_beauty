<template>
  <v-responsive
    class="border rounded"
  >
    <v-app>
      <v-app-bar
        title="Beauty help"
        @click="$router.push('/')"
      />

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
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();
</script>
