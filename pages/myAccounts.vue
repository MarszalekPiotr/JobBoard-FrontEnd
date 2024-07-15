<template>
  <div class="d-flex justify-center align-start" style="height: 100vh;">
    <VList class="pa-4 ma-4" outlined>
      <VListItemTitle class="text-h5 text-center text--grey">Konta Firmowe</VListItemTitle>
      <VListItem v-for="acc in companyAccounts" :key="acc.id" class="mb-4">
        <VListItemContent>
          <VListItemTitle class="text-h6 text--primary">{{ acc.accountName }}</VListItemTitle>
          <VListItemSubtitle class="text--grey">{{ acc.accountType }}</VListItemSubtitle>
        </VListItemContent>
        <VListItemAction>
          <VBtn :loading="loading" @click="selectAccount(acc.accountId, acc.accountType)" color="primary">Select</VBtn>
        </VListItemAction>
      </VListItem>

      <VListItemTitle class="text-h5 text-center text--grey">Konto Osobiste</VListItemTitle>
      <VListItem v-for="acc in candidateAccounts" :key="acc.id" class="mb-4">
        <VListItemContent>
          <VListItemTitle class="text-h6 text--primary">{{ acc.accountName }}</VListItemTitle>
          <VListItemSubtitle class="text--grey">{{ acc.accountType }}</VListItemSubtitle>
        </VListItemContent>
        <VListItemAction>
          <VBtn :loading="loading" @click="selectAccount(acc.accountId, acc.accountType)" color="primary">Select</VBtn>
        </VListItemAction>
      </VListItem>
    </VList>
  </div>
</template>

<script setup>


const errorMsg = ref('');
const { getErrorMessages } = UseErrorMessages();
const errorMap = { "Unauthorized": "Odmowa dostępu" };
const loading = ref(false);
const router = useRouter();
const selectAccount = (accountId, accountType) => {
  loading.value = true;
  useWebApiFetch('/User/SetCurrentAccount', {
    method: 'POST',
    body: { accountId, accountType },
    OnResponseError: ({ response }) => {
      errorMsg.value = getErrorMessages(response, errorMap, {});
    }
  })
  .then(async (response) => {
    if (response.data.value !== null) {
      await authState.checkAuthStatus();
    }
  })
  .finally(() => {
    loading.value = false;
    router.push({ path: '/' });
  });
};

const authState = useAuthState();
onMounted(async () => {
  await authState.checkAuthStatus();
});

const candidateAccounts = computed(() => authState.availableAccounts.value?.filter(acc => acc.accountType === candidateAccountType));
const companyAccounts = computed(() => authState.availableAccounts.value?.filter(acc => acc.accountType === companyAccountType));

const companyAccountType = "CompanyAccount";
const candidateAccountType = "CandidateAccount";

definePageMeta({
  layout: "default",
});
</script>
