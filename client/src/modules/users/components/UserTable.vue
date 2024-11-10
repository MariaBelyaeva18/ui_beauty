<template>
  <v-btn class="btn" @click.stop="openNew()">Add new user</v-btn>

  <v-data-table
    :headers="headers"
    :items="store.users"
    class="table"
  >
    <template v-slot:headers="{ columns }" >
      <tr class="head">
        <template v-for="column in columns" :key="column.title" >
          <td>
            <span>{{ column.title }}</span>
            <v-icon
              :class="{ arrow: revert, disabled: disable }"
              v-if="column.sort"
              size="small"
              @click="handleSortClick()"
              >mdi-arrow-down
            </v-icon>
          </td>
        </template>
      </tr>
    </template>
    
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon size="small" class="me-2" @click="openUpd(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item.id)"> mdi-delete </v-icon>
    </template>

  </v-data-table>
</template>

<script>
import { useStore } from "@/store/actions"
import headers from "@/modules/users/entities/headers"

export default {
	data() {
		return {
			store: useStore(),
			items: [],
			revert: false,
			disable: true,
		}
	},
	computed: {
		headers() {
			return headers()
		},
	},

	methods: {
		async loadData() {
			await this.store.getList()
			this.items = this.store.$state.users
		},

		async deleteItem(item) {
			await this.store.delOne(item)
			this.items = this.store.$state.users
		},

		async openUpd(item) {
			this.store.viewModal = true
			this.store.isEdit = true
			this.store.userEditId = item.id
			this.store.form = {
				name: item.name,
				surname: item.surname,
				gender: item.gender,
				birth: item.birth,
			}
		},
		async openNew() {
			this.store.viewModal = true
			this.store.userEditId = null
			this.store.isEdit = false
		},

		handleSortClick() {
			switch (this.store.meta.sort) {
			case "asc":
				this.revert = false
				this.disable = false
				this.store.meta.sort = "desc"
				break
			case "desc":
				this.revert = true
				this.disable = true
				this.store.meta.sort = ""
				break
			case "":
				this.revert = true
				this.disable = false
				this.store.meta.sort = "asc"
			}
			this.store.getList()
		},
	},

	mounted() {
		this.loadData()
	},
}
</script>
<style scoped>
.btn {
  background-color: #ff8dd871 !important;
  margin-left: 20px;
}

.table {
  padding-top: 20px;
  font-size: 15pt;
}

.head {
  background-color: #ff8dd871;
}

.arrow {
  transform: rotate(180deg);
}
.disabled {
  color: rgba(0, 0, 0, 0) !important;
  transform: rotate(180deg);
}

.disabled:hover {
  color: rgba(0, 0, 0, 0.42) !important;
}
</style>