<template>

  <CreateUserDialog :state="state"> </CreateUserDialog>
   
   <div>
    <h1 v-if ="!state.accountCreated && state.userCreated"> Nie posiadasz jeszcze konta - założ je aby w pełni korzystać z seriwsu</h1>
    <v-btn v-if = "!state.candidateAccountCreated && state.userCreated" @click ="options.candidateAccount = true">  założ profil kandydta    </v-btn>
    <v-btn  v-if ="state.userCreated" @click ="options.companyAccount = true">  założ profil firmy     </v-btn>
   </div>

  <CreateCandidateAccount  :state = "state" :options="options"  > </CreateCandidateAccount>
  <CreateCompanyAccount :state = "state" :options="options"> </CreateCompanyAccount>

</template>

<style></style>
<script setup>


const userStore = useUserStore();
const accountStore = UseAccountStore();
onMounted( () => {
  userStore.getLoggedUser();
  accountStore.getAccountsForCurrentUser();
  
  
});

const options = ref({
   candidateAccount: false,
   companyAccount: false 
})
userStore.getLoggedUser();
// const userCreated = computed(() => { return userStore.$state.loggedIn === true })
// const AccountCreated = computed(() => { return accountStore.$state.availableAccounts !== null && accountStore.$state.availableAccounts.length > 0 })
// const optionSelected = computed(() => { return (options.value.candidateAccount === true || options.value.companyAccount  === true)})

const state = ref({
  userCreated: computed(() => { return userStore.$state.loggedIn === true }),
  accountCreated: computed(() => { return accountStore.$state.availableAccounts !== null && accountStore.$state.availableAccounts.length > 0 }),
  optionSelected: computed(() => { return (options.value.candidateAccount === true || options.value.companyAccount  === true)}),
  candidateAccountCreated: computed(() => {   
                console.log(accountStore.$state.availableAccounts);
                return (accountStore.$state.availableAccounts?.filter(acc => acc.accountType ===  candidateAccountType).length > 0) })
})

const companyAccountType = "CompanyAccount";
const candidateAccountType = "CandidateAccount";


const showOptions = computed(() => { return state.value.userCreated && !state.value.accountCreated && !state.value.optionSelected})

definePageMeta({
  layout: "registration",
});
</script>
