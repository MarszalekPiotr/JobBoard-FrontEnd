<template>
    <div class="pa-4 text-center">
        <v-dialog class="custom-dialog"  :model-value="accountStore.$state.accountSelected === false && userStore.$state.loggedIn === true " persistent width="auto" scrollable>

            <v-divider class="mt-3"></v-divider>

            <v-card-text class="px-4" style="height: 300px;">
                <VCardTitle class="text-center">Wybierz konto</VCardTitle>
                <v-radio-group v-model="dialog" column>
                    <v-radio v-for="(account, index) in accounts" :key="account.accountId" :label="account.accountName"
                        :value="account.accountId"></v-radio>

                </v-radio-group>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                

                <v-spacer></v-spacer>

                <v-btn color="surface-variant" text="Save" variant="flat" @click="submitSelectedAccount"></v-btn>
            </v-card-actions>
        </v-dialog>
    </div>
</template>

<style scoped>
.custom-dialog .v-dialog {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>

<script setup>
import { ref } from 'vue'

const userStore = useUserStore();
const accountStore = UseAccountStore();
accountStore.getSelectedAccount();
accountStore.getAccountsForCurrentUser();

const accounts = computed(() => {
   return  accountStore.$state.availableAccounts;
})
// let accounts = accountStore.$state.availableAccounts;

const dialog = ref(null);
function submitSelectedAccount() {
    if (dialog.value) {
      // Access the selected account from the dialog variable
      const selectedAccount = dialog.value
      console.log('Selected Account:', selectedAccount)

      // Perform actions with the selected account, e.g., save it
      // Example:
      // accountStore.saveSelectedAccount(selectedAccount)

      // Close the dialog
      dialog.value = null
    }
  }

</script>
