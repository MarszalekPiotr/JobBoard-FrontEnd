<template>
  <CreateUserDialog :state="state"></CreateUserDialog>
  
  <div class="center-container">
    <h1 v-if="!state.accountCreated && state.userCreated" class="main-heading">Nie posiadasz jeszcze konta - załóż je, aby w pełni korzystać z serwisu</h1>
    <v-btn v-if="!state.candidateAccountCreated && state.userCreated" @click="options.candidateAccount = true" class="primary-btn">Załóż profil kandydata</v-btn>
    <v-btn v-if="state.userCreated" @click="options.companyAccount = true" class="colorful-btn">Załóż profil firmy</v-btn>
  </div>

  <CreateCandidateAccount :state="state" :options="options"></CreateCandidateAccount>
  <CreateCompanyAccount :state="state" :options="options"></CreateCompanyAccount>
</template>

<style>
.center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.main-heading {
  font-size: 24px; /* Adjust font size */
  text-align: center;
  margin-bottom: 24px; /* Add margin for spacing */
}

.colorful-btn {
  color: #fff; /* Text color */
  background-color: #4caf50; /* Button background color */
}
</style>

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


// const showOptions = computed(() => { return state.value.userCreated && !state.value.accountCreated && !state.value.optionSelected})

definePageMeta({
  layout: "registration",
});
</script>
