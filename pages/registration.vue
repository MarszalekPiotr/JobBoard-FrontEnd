<template>

  <CreateUserDialog :userCreated="userCreated"> </CreateUserDialog>
   
   <div v-if="userCreated && !AccountCreated && !optionSelected" >
    Nie posiadasz jeszcze konta: 
    <v-btn @click ="options.candidateAccount = true">  założ profil kandydta     </v-btn>
    <v-btn @click ="options.companyAccount = true">  założ profil firmy     </v-btn>
   </div>

  <CreateCandidateAccount :userCreated="userCreated" :AccountCreated="AccountCreated" :CandidateAccountChoosen="options.candidateAccount" > </CreateCandidateAccount>

</template>

<style></style>
<script setup>


const userStore = useUserStore();
const accountStore = UseAccountStore();
onMounted( () => {
  userStore.getLoggedUser();
  accountStore.getAccountsForCurrentUser();
  console.log(userCreated, AccountCreated, optionSelected);
});

const options = ref({
   candidateAccount: false,
   companyAccount: false 
})
userStore.getLoggedUser();
const userCreated = computed(() => { return userStore.$state.loggedIn === true })
const AccountCreated = computed(() => { return accountStore.$state.availableAccounts !== null && accountStore.$state.availableAccounts.length > 0 })
const optionSelected = computed(() => { return (options.value.candidateAccount === true || options.value.companyAccount  === true)})



definePageMeta({
  layout: "registration",
});
</script>
