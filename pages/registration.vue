<template>
  <CreateUserDialog></CreateUserDialog>
  
  <div class="d-flex flex-column justify-center align-center" style="height: 100vh;">
    <h1 v-if="!anyAccountAvailable && userLoggedIn" class="text-h5 text-center mb-6">
      Nie posiadasz jeszcze konta - załóż je, aby w pełni korzystać z serwisu
    </h1>
    <CreateCandidateAccount v-if="showCandidateButtton"></CreateCandidateAccount>
    <CreateCompanyAccount v-if="showCompanyButton"></CreateCompanyAccount>
  </div>
</template>

<script setup>

const {userLoggedIn, candidateAccountCreated, anyAccountAvailable} = useAuthState();
const showCandidateButtton = computed(() => userLoggedIn && !candidateAccountCreated.value);
const showCompanyButton = computed(() => userLoggedIn);

console.log(candidateAccountCreated.value)
definePageMeta({
  layout: "registration",
});
</script>
