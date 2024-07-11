<template>
  <CreateUserDialog ></CreateUserDialog>
  
  <div class="center-container">
    <h1 v-if="!authState.anyAccountAvailable && authState.userLoggedIn" class="main-heading">Nie posiadasz jeszcze konta - załóż je, aby w pełni korzystać z serwisu</h1>
    <CreateCandidateAccount v-if="showCandidateButtton" ></CreateCandidateAccount>
    <CreateCompanyAccount v-if="showCompanyButton"  ></CreateCompanyAccount>
  </div>
 
  <!-- tutaj if do wyswietlania  -->

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

const authState = useAuthState();
const showCandidateButtton = computed(() => { return authState.userLoggedIn.value && !authState.candidateAccountCreated})
const showCompanyButton = computed (() => { return authState.userLoggedIn.value })

definePageMeta({
  layout: "registration",
});
</script>
