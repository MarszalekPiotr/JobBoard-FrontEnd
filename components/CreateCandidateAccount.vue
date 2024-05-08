<template>


    <VDialog :model-value="userCreated && !AccountCreated && CandidateAccountChoosen === true" persistent width="400" scroll-strategy="none">
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
                        <!-- <v-date-picker v-model="CreateCandidateAccountViewModel.BirthDate" type = "date" :rules=[ruleRequired] label ="Data urodzenia">    </v-date-picker> -->
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
const { getErrorMessages } = UseErrorMessages();
const { ruleRequired, ruleEmail } = useFormRules();
const errorMsg = ref('');
const loading = ref(false);
const CreateCandidateAccountViewModel = ref({
    Name:'',
    Description:'',
    ContactEmail: '',
    Surname: '',
    BirthDate: '',
    PhoneNumber: ''
});
const rules = {
    // samePassword : (v) => v === registrationViewModel.value.password || 'Hasła różnią się od siebie',
}
defineProps(['userCreated','AccountCreated','CandidateAccountChoosen'])

const submit = async (event) => {

    const { valid } = await event;
    if (valid) {
        createUser();
    }

}

const createUser = () => {
    loading.value = true ;
    useWebApiFetch('/User/CreateUser', {
        method: 'POST',
        body: { ...registrationViewModel.value },
        onErrorResponse: ({ response }) => {
            errorMsg.value = getErrorMessages(response, {}, {})
        },
    })
    .then(({response}) => {
         if(response.value){
          
         }
    })
    .finally(() => {
        loading.value = false;
        
    })


}
</script>