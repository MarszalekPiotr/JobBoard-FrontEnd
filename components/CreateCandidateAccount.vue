<template>

   <v-btn class="primary-btn" @click="show = true">Załóż profil kandydata</v-btn>
   
    <VDialog :model-value="show" persistent width="400" scroll-strategy="none">
        <VCard class="py-4">
            <VCardTitle class="text-center">zaloz konto kandydata</VCardTitle>
            <div v-if="loading" class="pa-4 d-flex justify-center">
                <v-progress-circular indeterminate color="red"></v-progress-circular>
            </div>
            <VForm v-else @submit.prevent="submit" :disabled="loading">
                <VCardText>
                    <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired]
                        v-model="CreateCandidateAccountViewModel.Name" label="Name"></v-text-field>
                    <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired]
                        v-model="CreateCandidateAccountViewModel.Description" type="" label="Opis"></v-text-field>
                        <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired,rules.samePassword]
                        v-model="CreateCandidateAccountViewModel.ContactEmail" type="" label="E-mail kontaktowy"></v-text-field>
                        <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired]
                        v-model="CreateCandidateAccountViewModel.Surname" type="" label="Nazwisko"></v-text-field>
                        <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired,rules.samePassword]
                        v-model="CreateCandidateAccountViewModel.PhoneNumber" type="" label="Telefon"></v-text-field>
                        <label> Data urodzenia </label>
                        <input   v-model="CreateCandidateAccountViewModel.BirthDate" type = "date" :rules=[ruleRequired] label ="Data urodzenia"></input>
                          
                </VCardText>
                <VCardActions>
                    <v-btn class="mx-auto" color="primary" type="submit" :loading="loading"
                        variant="elevated">Zarejestruj</v-btn>
                </VCardActions>
                <VAlert v-if="errorMsg" type="error" variant="elevated">{{ errorMsg }}</VAlert>
            </VForm>
        </VCard>
    </VDialog>

</template>



<style></style>

<script setup>

const router = useRouter();
const globalMessageStore = useMessageStore();
const authStore = useAuthStore();
const authState = useAuthState();
const accountStore = UseAccountStore();
const { getErrorMessages } = UseErrorMessages();
const { ruleRequired, ruleEmail } = useFormRules();
const errorMsg = ref('');
const loading = computed( () => { return authState.loading.value })
const CreateCandidateAccountViewModel = ref({
    Name:'',
    Description:'',
    ContactEmail: '',
    Surname: '',
    BirthDate: '',
    PhoneNumber: '',
    BirthDate : ''
});
const rules = {
    // samePassword : (v) => v === registrationViewModel.value.password || 'Hasła różnią się od siebie',
}


const show = ref(false);
const submit = async (event) => {  

    const { valid } = await event;
    if (valid) {
        accountStore.createCandidateAccount(CreateCandidateAccountViewModel);
    }

}


</script>