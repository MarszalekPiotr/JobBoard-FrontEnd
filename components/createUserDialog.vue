<template>


    <VDialog :model-value="!userCreated" persistent width="400" scroll-strategy="none">
        <VCard class="py-4">
            <VCardTitle class="text-center">Rejestracja</VCardTitle>
            <div v-if="loading" class="pa-4 d-flex justify-center">
                <v-progress-circular indeterminate color="red"></v-progress-circular>
            </div>
            <VForm v-else @submit.prevent="submit" :disabled="loading">
                <VCardText>
                    <v-text-field class="mb-4" variant="outlined" :rules=[]
                        v-model="registrationViewModel.email" label="Email"></v-text-field>
                    <v-text-field class="mb-4" variant="outlined" :rules=[]
                        v-model="registrationViewModel.password" type="password" label="Hasło"></v-text-field>
                        <v-text-field class="mb-4" variant="outlined" :rules=[]
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
defineProps(['userCreated'])

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
            this.userCreated = true 
         }
    })
    .finally(() => {
        loading.value = false;
        
    })


}
</script>