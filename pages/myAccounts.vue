<template>

    <VList>
        <VListItem v-for="acc in companyAccounts" :title="acc.accountName">

        </VListItem>
    </VList>

</template>

<style></style>

<script setup>





const accountStore = UseAccountStore();
accountStore.getAccountsForCurrentUser();

const candidateAccounts = computed(() => { return accountStore.$state.availableAccounts?.filter(acc => acc.accountType === candidateAccountType) });

const companyAccounts = computed(() => { return accountStore.$state.availableAccounts?.filter(acc => acc.accountType === companyAccountType) });

console.log(companyAccounts.value);



const companyAccountType = "CompanyAccount";
const candidateAccountType = "CandidateAccount";
// definePageMeta({
//   layout: "default",
// });
</script>