<template>
  <div  class="pa-4 text-center">
    <v-dialog class="custom-dialog" :model-value="!authState.loggedInAccountSelected.value && authState.userLoggedIn.value" persistent width="auto" scrollable>

      <v-divider class="mt-3"></v-divider>

      <v-card-text class="px-4" style="height: 300px;">
        <VCardTitle class="text-center" style="font-size: 24px;">Wybierz konto</VCardTitle>
        <v-radio-group v-model="dialog" column>
          <v-radio v-for="(account, index) in accounts" :key="account.accountId" :label="account.accountName" :value="account.accountId" class="brighter-font"></v-radio>
        </v-radio-group>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="submitSelectedAccount" :loading="loading" class="font-weight-bold">Wybierz</v-btn>
      </v-card-actions>
    </v-dialog>
  </div>
</template>

<style>
.custom-dialog .v-dialog {
  background-color: #ffffff; /* White background color */
  border-radius: 12px; /* Increased border radius */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
}

.custom-dialog .v-dialog__container {
  background-color: #ffffff; /* White background color */
}

.custom-dialog .v-divider {
  border-color: #ccc;
}

.custom-dialog .v-card-actions {
  padding: 16px;
}

.custom-dialog .v-radio {
  font-size: 18px; /* Increase font size */
  padding: 12px; /* Add padding */
  border: 1px solid #ccc; /* Add a frame */
  border-radius: 8px; /* Add border radius */
  background-color: #ffffff; /* White background color for options */
}

.custom-dialog .v-radio:hover {
  background-color: #f5f5f5; /* Gray background color on hover */
}

.custom-dialog .v-btn {
  font-weight: bold;
}

.brighter-font {
  color: #000; /* Darker font color for better visibility */
}
</style>




<script setup>
import { ref } from 'vue'

const userStore = useUserStore();
const accountStore = UseAccountStore();
const router = useRouter();
accountStore.getSelectedAccount();
accountStore.getAccountsForCurrentUser();
userStore.getLoggedUser();
const authStore = useAuthStore();
const authState = useAuthState();

// userStore.$subscribe((mutation, state) => {    
//     if (state.loggedIn) {
//       if(accountStore.$state.availableAccounts === null ||accountStore.$state.availableAccounts?.length === 0 ){ 
//            router.push({path:"/registration"})
//       }
//       else{
//         router.push({path:"/"})
//       }
       
//     }
// })


// accountStore.$subscribe((mutation, state) => {    
//       if(accountStore.$state.availableAccounts === null ||accountStore.$state.availableAccounts?.length === 0 ){ 
//            router.push({path:"/registration"})
//       }
//       else{
//         router.push({path:"/"})
//       }
       
//     }
// )

const accounts = computed(() => {
    console.log(accounts);
   return  accountStore.$state.availableAccounts;
})



// let accounts = accountStore.$state.availableAccounts;

const errorMsg = ref('');
const loading= ref(false);
const dialog = ref(null);
const errorMap = { "Unauthorized" : "Odmowa dostępu"}
const {getErrorMessages} = UseErrorMessages();
function submitSelectedAccount() {
    loading.value = true;
    if (dialog.value) {
      // Access the selected account from the dialog variable
      const selectedAccount = dialog.value
      console.log('Selected Account:', selectedAccount)
       
       useWebApiFetch('/User/SetCurrentAccount', 
       {method:'POST' ,
        body:{"accountId" : selectedAccount},
        OnResponseError: ({response}) =>{
        errorMsg.value = getErrorMessages(response, errorMap  ,{} )
        }
          })
          .then((response) => {
                if(response.data.value){
                    accountStore.getSelectedAccount();
                    
                }
          })
          .finally(() => {
            loading.value = false;
            router.push({ path: '/' }) ; 
          }) 
      
      
      // Perform actions with the selected account, e.g., save it
      // Example:
      // accountStore.saveSelectedAccount(selectedAccount)

      // Close the dialog
      
    }
  }
const companyAccountType = "Company";
const candidateAccountType = "Candidate";

</script>
