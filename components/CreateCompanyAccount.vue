<template>
    <VDialog :model-value="show" persistent width="400" scroll-strategy="none">
        <VCard class="py-4">
            <VCardTitle class="text-center">Załóż konto firmowe</VCardTitle>
            <div v-if="loading" class="pa-4 d-flex justify-center">
                <v-progress-circular indeterminate color="red"></v-progress-circular>
            </div>
            <VForm v-else @submit.prevent="submit" :disabled="loading">
                <VCardText>
                    <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired]
                        v-model="CreateCompanyAccountViewModel.Name" label="Nazwa"></v-text-field>
                    <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired]
                        v-model="CreateCompanyAccountViewModel.Description" type="" label="Opis"></v-text-field>
                    <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired]
                        v-model="CreateCompanyAccountViewModel.ContactEmail" type=""
                        label="E-mail kontaktowy"></v-text-field>
                    <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired]
                        v-model="CreateCompanyAccountViewModel.NIP" type="" label="NIP"></v-text-field>

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

const router = useRouter();

const { getErrorMessages } = UseErrorMessages();
const { ruleRequired, ruleEmail } = useFormRules();
const errorMsg = ref('');
const loading = ref(false);
const CreateCompanyAccountViewModel = ref({
    Name: '',
    Description: '',
    ContactEmail: '',
    NIP: ''

});
const rules = {
    // samePassword : (v) => v === registrationViewModel.value.password || 'Hasła różnią się od siebie',
}
const props = defineProps(['state', 'options'])

const show = computed(() => { return props.state.userCreated && props.options.companyAccount })
const submit = async (event) => {

    const { valid } = await event;
    if (valid) {
        createUser();
    }

}

const createUser = () => {
    loading.value = true;
    useWebApiFetch('/User/CreateCompanyAccount', {
        method: 'POST',
        body: { ...CreateCompanyAccountViewModel.value },
        onErrorResponse: ({ response }) => {
            errorMsg.value = getErrorMessages(response, {messageMap}, {fieldMap})
            console.log("błąd");
            console.log(CreateCompanyAccountViewModel.value);
            console.log(reponse);
        },
    })
        .then(( response ) => {
            if (response.data.value) {
                router.push({ path: '/' })  
            }
        })
        .finally(() => {
            loading.value = false;

        })


}


const messageMap ={ "Invalid login or password": "Niepoprawny Login Lub Hasło",
                     "EmailValidator": "Błędny email",
                      "NotEmptyValidator" : "Puste dane"   };
const fieldMap = {"Email" : "Email",
                 "Password": "hasło"                   }
</script>