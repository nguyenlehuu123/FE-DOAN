<script setup lang="ts">

import NguyenDataTable from "~/components/ui/NguyenDataTable.vue";
import { useI18n } from "vue-i18n";
import { useDraftingStore } from "~/stores/draftingStore";
import userManagementRepository from "~/repositories/master/userManagementRepository";
import { computed, dialogConfirmStore } from "#imports";
import Toast from "~/common/toast";
import { TOAST_TYPE } from "~/common/constant";

const i18n = useI18n()
const headersFixed = [
  {
    key: 'no',
    title: 'No',
    align: 'center',
    sortable: true,
    width: '10%',
    fixed: true
  },
  {
    key: 'userId',
    title: 'ID',
    align: 'center',
    sortable: true,
    width: '10%',
    fixed: true
  },
  {
    key: 'email',
    title: 'Email',
    align: 'center',
    sortable: true,
    width: '30%',
    fixed: true
  },
  {
    key: 'role',
    title: 'Role',
    align: 'center',
    sortable: true,
    width: '15%',
    fixed: true
  },
  {
    key: 'edit',
    title: 'Edit',
    align: 'center',
    sortable: false,
    width: '10%',
    fixed: true
  },
  {
    key: 'save',
    title: 'Save',
    align: 'center',
    sortable: false,
    width: '10%',
    fixed: true
  },
  {
    key: 'delete',
    title: 'Delete',
    align: 'center',
    sortable: false,
    width: '10%',
    fixed: true
  },
]

const NO_ACTION = 0
const EDIT_MODE = 1
const SAVE_MODE = 2
const DELETE_MODE = 3

const itemsStatus = ['USER', 'ADMIN']

interface IUserManagementDTO {
  no?: number,
  userId: number,
  email: string,
  role: string
}

interface IUserManagementResponse {
  total: number,
  userManagementDTOS: IUserManagementDTO[]
}

const page = ref<number>(1)
const totalPaging = ref<number>(0)
const userManagementDTOS = ref<IUserManagementDTO[]>()
const mode = ref<Record<number, number>>({})
const statusRoleMenu = ref<Record<number, number>>({})
const originalRoleValues = ref<Record<number, number>>({})
const dialogConfirm = dialogConfirmStore()

const draftingStore = useDraftingStore()
const drafting = computed(
  {
    get() {
      return draftingStore.getDrafting
    },
    set(value: boolean) {
      draftingStore.updateDrafting(value)
    }
  }
)

const pagingRequest = {
  pageNum: page.value,
  pageSize: 20,
}

onMounted(() => {
  getAllUsers(1)
})

watch(page, (newValue) => {
  getAllUsers(newValue)
})

const getAllUsers = (pageNum: number) => {
  if (pageNum) {
    pagingRequest.pageNum = pageNum
  }
  userManagementRepository.getUsers(pagingRequest)
    .then(response => {
      userManagementDTOS.value = (response as IUserManagementResponse).userManagementDTOS
      for (let i = 0; i < userManagementDTOS.value?.length; i++) {
        userManagementDTOS.value[i].no = i + 1
        originalRoleValues.value[userManagementDTOS.value[i].userId] = itemsStatus.indexOf(userManagementDTOS.value[i].role) + 1
      }
      totalPaging.value = Math.ceil((response as IUserManagementResponse).total / pagingRequest.pageSize)
    })
}

const handleEditRoleUser = (userId: number) => {
  if (mode.value[userId] === EDIT_MODE) {
    mode.value[userId] = NO_ACTION
  } else {
    mode.value[userId] = EDIT_MODE
    statusRoleMenu.value[userId] = originalRoleValues.value[userId]
  }
}

const handleSaveRoleUser = (userId: number) => {
  const selectedRole = itemsStatus[statusRoleMenu.value[userId] - 1]
  userManagementRepository.updateRoleUser(userId, { role: selectedRole })
    .then(response => {
      // handle response here
      mode.value[userId] = NO_ACTION
      statusRoleMenu.value[userId] = itemsStatus.indexOf(selectedRole) + 1
      originalRoleValues.value[userId] = itemsStatus.indexOf(selectedRole) + 1
      const userToUpdate = userManagementDTOS.value?.find(user => user.userId === userId)
      if (userToUpdate) {
        userToUpdate.role = selectedRole
      }
    })
    .catch(error => {
      // TODO
    })
}

const handleDeleteUser = (userId: number) => {
  userManagementRepository.deleteUsers(userId)
    .then((response) => {
      if (userManagementDTOS.value) {
        userManagementDTOS.value = userManagementDTOS.value.filter(item => item.userId !== userId)
        userManagementDTOS.value.forEach((item, index) => {
          item.no = index + 1;
        });
      }
    })
  Toast.showManual(i18n.t('message.000014', [i18n.t('page.uploadStory.delete')]), TOAST_TYPE.SUCCESS)
}

const handleClickDeleteUser = (userId: number) => {
  dialogConfirm.setConfirmParam([userId])
  dialogConfirm.setConfirmResolve(() => handleDeleteUser(userId))
  dialogConfirm.setContentMessage(i18n.t('message.000016'))
  dialogConfirm.setShow(true)
}


const handleUpdateRole = (userId: number, value: number) => {
  statusRoleMenu.value[userId] = value
}

</script>

<template>
  <div style="margin-top: 100px">
    <div style="display: flex; align-items: center; gap: 20px; color: #4FC3F7; margin-bottom: 50px">
      <v-icon icon="mdi-flag-variant"></v-icon>
      <span style="font-size: 24px">Quản lý user</span>
    </div>
    <nguyen-data-table
      :headers="headersFixed"
      :height="800"
      :max-height="600"
      :items="userManagementDTOS ?? []"
    >
      <template #item.edit="{ item }">
        <div
          style="cursor: pointer; width: 100%; display: flex; justify-content: center; align-items: center; border-radius: 1px"
        >
          <div class="edit-story-icon"
               :class="{ 'edit-mode': mode[item?.userId] === EDIT_MODE }"
               style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 1px"
               @click="() => handleEditRoleUser(item?.userId)"
          >
            <v-icon icon="mdi-pencil"></v-icon>
          </div>
        </div>
      </template>
      <template #item.save="{ item }">
        <div
          style="cursor: pointer; width: 100%; display: flex; justify-content: center; align-items: center; border-radius: 1px"
        >
          <div class="save-story-icon"
               :class="{ 'save-mode': mode[item?.userId] === EDIT_MODE }"
               style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 1px"
               @click="() => handleSaveRoleUser(item?.userId)"
          >
            <v-icon icon="mdi-content-save"></v-icon>
          </div>
        </div>
      </template>
      <template #item.delete="{ item }">
        <div
          style="cursor: pointer; width: 100%; display: flex; justify-content: center; align-items: center; border-radius: 1px"
        >
          <div class="delete-story-icon"
               style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 1px"
               @click="() => handleClickDeleteUser(item?.userId)"
          >
            <v-icon icon="mdi-trash-can-outline"></v-icon>
          </div>
        </div>
      </template>
      <template #item.role="{ item }">
        <div v-if="mode[item?.userId] !== EDIT_MODE">
          <span>{{ item?.role }}</span>
        </div>
        <div v-if="mode[item?.userId] === EDIT_MODE" style="display: flex; justify-content: center">
          <v-chip style="cursor: pointer; width: 100px; display: flex; justify-content: center"
                  :id="`select-role-${item?.userId}`">
            {{ itemsStatus[statusRoleMenu[item?.userId] - 1] }}
          </v-chip>
          <v-menu :activator="`#select-role-${item?.userId}`">
            <v-list style="top: 2px;">
              <v-list-item
                v-for="(status, index) in itemsStatus"
                :key="index"
                :value="index + 1"
                @click="() => handleUpdateRole(item?.userId,index + 1)"
              >
                <v-list-item-title>{{ status }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      <template #bottom>
        <div>
          <v-pagination
            v-model="page"
            :length="totalPaging"
            :total-visible="7"
          ></v-pagination>
        </div>
      </template>
    </nguyen-data-table>
  </div>
</template>

<style lang="scss">
.edit-story-icon:hover {
  color: #81C784;
}

.delete-story-icon:hover {
  color: red;
}

.edit-mode {
  color: red;
}

.save-mode {
  color: green;
}
</style>
