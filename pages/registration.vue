<template>
  <CreateUserDialog ></CreateUserDialog>
  
  <div class="center-container">
    <h1 v-if="!authStore.$state.anyAccountAvailable && authStore.$state.userLoggedIn" class="main-heading">Nie posiadasz jeszcze konta - załóż je, aby w pełni korzystać z serwisu</h1>
    <v-btn v-if="showCandidateButtton" class="primary-btn" @click="options.candidateAccount = true">Załóż profil kandydata</v-btn>
    <v-btn v-if="showCompanyButton" @click="options.companyAccount = true" class="colorful-btn">Załóż profil firmy</v-btn>
  </div>

  <CreateCandidateAccount  :options="options"></CreateCandidateAccount>
  <CreateCompanyAccount  :options="options"></CreateCompanyAccount>
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

const authStore = useAuthStore();
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

const showCandidateButtton = computed(() => { return authStore.$state.userLoggedIn && !authStore.$state.candidateAccountCreated})
const showCompanyButton = computed (() => { return authStore.$state.userLoggedIn })
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
