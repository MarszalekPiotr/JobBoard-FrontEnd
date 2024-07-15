<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="loggedInNoAccountSelected" persistent width="auto" scrollable>
      <v-card>
        <v-card-text class="px-4" style="height: 300px;">
          <v-card-title class="text-center text-h5">Wybierz konto</v-card-title>
          <v-divider class="my-4"></v-divider>
          <v-radio-group v-model="dialog" column>
            <v-radio
              v-for="(account, index) in accounts"
              :key="account.accountId"
              :label="account.accountName"
              :value="account"
              class="mb-3"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submitSelectedAccount" :loading="loading">Wybierz</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>


const accountStore = UseAccountStore();
const router = useRouter();
const {loggedInNoAccountSelected,availableAccounts,checkAuthStatus} = useAuthState();
const authState = useAuthState();

onMounted(() => {
   checkAuthStatus();
});

const accounts = computed(() => availableAccounts.value);

const errorMsg = ref('');
const loading = ref(false);
const dialog = ref(null);
const errorMap = { Unauthorized: 'Odmowa dostępu' };
const { getErrorMessages } = UseErrorMessages();

function submitSelectedAccount() {
  loading.value = true;
  if (dialog.value) {
    const selectedAccount = dialog.value;
    useWebApiFetch('/User/SetCurrentAccount', {
      method: 'POST',
      body: {
        accountId: selectedAccount.accountId,
        accountType: selectedAccount.accountType,
      },
      OnResponseError: ({ response }) => {
        errorMsg.value = getErrorMessages(response, errorMap, {});
      },
    })
      .then((response) => {
        if (response.data.value) {
          accountStore.getSelectedAccount();
        }
      })
      .finally(() => {
        loading.value = false;
        router.push({ path: '/' });
      });
  }
}
</script>
