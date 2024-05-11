<template>


    <VDialog :model-value="!props.state.userCreated" persistent width="400" scroll-strategy="none">
        <VCard class="py-4">
            <VCardTitle class="text-center">Rejestracja</VCardTitle>
            <div v-if="loading" class="pa-4 d-flex justify-center">
                <v-progress-circular indeterminate color="red"></v-progress-circular>
            </div>
            <VForm v-else @submit.prevent="submit" :disabled="loading">
                <VCardText>
                    <v-text-field class="mb-4" variant="outlined" :rules=[]
                        v-model="registrationViewModel.email" label="Email"></v-text-field>
                    <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired]
                        v-model="registrationViewModel.password" type="password" label="Hasło"></v-text-field>
                        <v-text-field class="mb-4" variant="outlined" :rules=[ruleRequired,rules.samePassword]
                        v-model="registrationViewModel.repeatPassword" type="password" label="powtórz Hasło"></v-text-field>
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
const userStore= useUserStore();
const { getErrorMessages } = UseErrorMessages();
const { ruleRequired, ruleEmail } = useFormRules();
const errorMsg = ref('');
const loading = ref(false);
const registrationViewModel = ref({
    email: "",
    password: '',
    repeatPassword:''
});
const rules = {
    samePassword : (v) => v === registrationViewModel.value.password || 'Hasła różnią się od siebie',
}
const props = defineProps(['userCreated' ,'state'])

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
            errorMsg.value = getErrorMessages(response, {"User With this Email already exists": "Użytkownik z takim adresem e-mail juz istnieje"}, {})
        },
    })
    .then((response) => {
         if(response.data.value !== null){
          userStore.getLoggedUser();
         }
    })
    .finally(() => {
        loading.value = false;
        
    })


}
</script>