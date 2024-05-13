<template>
    <div class="centered">
      <VList class="list-container framed">
        <VListItemTitle class="headline grey--text">Konta Firmowe</VListItemTitle>
        <VListItem v-for="acc in companyAccounts" :key="acc.id" class="list-item">
          <VListItemContent>
            <VListItemTitle class="accent larger-font">{{ acc.accountName }}</VListItemTitle>
            <VListItemSubtitle class="grey--text">{{ acc.accountType }}</VListItemSubtitle>
          </VListItemContent>
          <VListItemAction>
            <VBtn :loading = "loading" @click="selectAccount(acc.accountId)" color="primary">Select</VBtn>
          </VListItemAction>
        </VListItem>
  
        <VListItemTitle class="headline grey--text">Konto Osobiste</VListItemTitle>
        <VListItem v-for="acc in candidateAccounts" :key="acc.id" class="list-item">
          <VListItemContent>
            <VListItemTitle class="primary--text larger-font">{{ acc.accountName }}</VListItemTitle>
            <VListItemSubtitle class="grey--text">{{ acc.accountType }}</VListItemSubtitle>
          </VListItemContent>
          <VListItemAction>
            <VBtn :loading = "loading" @click="selectAccount(acc.accountId)" color="primary">Select</VBtn>
          </VListItemAction>
        </VListItem>
      </VList>
    </div>
  </template>
  
  <style>
  .centered {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
  }
  
  .list-container {
    width: 80%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 16px;
  }
  
  .framed {
    border: 2px solid #000;
  }
  
  .list-item {
    margin-bottom: 16px;
  }
  
  .headline {
    font-size: 24px;
    text-align: center;
    margin-bottom: 16px;
  }
  
  .larger-font {
    font-size: 18px;
  }
  
  .accent {
    color: blue;
    font-weight: bold;
  }
  
  .primary--text {
    color: green;
    font-weight: bold;
  }
  </style>
  

<script setup>

const errorMsg = ref('')
const {getErrorMessages} = UseErrorMessages();
const errorMap = { "Unauthorized" : "Odmowa dostępu"}
const loading = ref(false);
const router = useRouter();
const selectAccount = (accountId) =>{
       loading.value = true; 
    useWebApiFetch('/User/SetCurrentAccount', 
       {method:'POST' ,
        body:{"accountId" : accountId},
        OnResponseError: ({response}) =>{
        errorMsg.value = getErrorMessages(response, errorMap  ,{} )
        }
          })
          .then((response) => {
                if(response.data.value !== null){
                    accountStore.getSelectedAccount();
                    
                    
                }
          })
          .finally(() => {
            loading.value = false;
            router.push({ path: '/' }) ; 

          }) 
}


const accountStore = UseAccountStore();
accountStore.getAccountsForCurrentUser();

const candidateAccounts = computed(() => { return accountStore.$state.availableAccounts?.filter(acc => acc.accountType === candidateAccountType) });

const companyAccounts = computed(() => { return accountStore.$state.availableAccounts?.filter(acc => acc.accountType === companyAccountType) });

console.log(companyAccounts.value);



const companyAccountType = "CompanyAccount";
const candidateAccountType = "CandidateAccount";
definePageMeta({
  layout: "default",
});
</script>