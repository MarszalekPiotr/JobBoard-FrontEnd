<template>

<VDialog :model-value ="showDialog" persistent width="400" scroll-strategy="none">
    <VCard class="py-4">
    <VCardTitle class="text-center">Logowanie</VCardTitle>
    <div v-if="userStore.$state.loading === true" class="pa-4 d-flex justify-center">
    <v-progress-circular indeterminate color="red"></v-progress-circular>
   </div>
    <VForm v-else @submit.prevent = "submit" :disabled= "loading" >
        <VCardText>
            <v-text-field class="mb-4" variant="outlined" :rules =[ruleRequired,ruleEmail] v-model="loginViewModel.email" label="Email"></v-text-field>
            <v-text-field class="mb-4" variant="outlined" :rules =[ruleRequired] v-model="loginViewModel.password" type="password" label="Hasło"></v-text-field>
        </VCardText>
        <VCardActions>
            <v-btn class="mx-auto" color="primary" type="submit" :loading="loading" variant="elevated">Zaloguj</v-btn>
            <v-btn class="mx-auto" color="primary"> <RouterLink to="registration">  Zarejestruj się </RouterLink>          </v-btn>
        </VCardActions>
        <VAlert v-if="errorMsg" type="error" variant="elevated">{{ errorMsg }}</VAlert>
    </VForm>
</VCard>
</VDialog>

</template>


<style lang="scss" scoped>

</style>

<script setup>
import { useAuthState } from '~/composables/authState';
import { useFormRules } from '~/utils/fromValidationRules';
import { UseErrorMessages } from '~/utils/getErrorMessages';

const authStore = useAuthStore();
const authState = useAuthState();
const accountStore = UseAccountStore();
const userStore = useUserStore();
const globalMessageStore = useMessageStore();

const showDialog = computed(() => {
   return  !authState.userLoggedIn.value || authState.loading.value;
})

const loginViewModel =
ref(
{
    email : "",
    password : ""

})


const {ruleEmail , ruleRequired} = useFormRules();
 const  submit = async (event) => {
    const {valid} = await event;
    if(valid){
        login();
       
    }
}



const loading = ref(false);
const errorMsg = ref("");

const login = () =>{
     errorMsg.value = "";
     loading.value = true;

    useWebApiFetch("/User/Login", {
        method: 'POST',
        body:{...loginViewModel.value},
        onResponseError: ({response}) => {
            console.log("error occure");
               errorMsg.value = getErrorMessages(response,messageMap,fieldMap)
        }
       })
       .then((response) => {
         if(response.data.value){
            authState.checkAuthStatus();
            loginViewModel.value.password = ''
            globalMessageStore.showSuccessMessage("Pomyślnie zalogowano")
            
         }
       }).finally(() => {
          loading.value = false;
       })
}

const {getErrorMessages} = UseErrorMessages();

const messageMap ={ "Invalid login or password": "Niepoprawny Login Lub Hasło",
                     "EmailValidator": "Błędny email",
                      "NotEmptyValidator" : "Puste dane"   };
const fieldMap = {"Email" : "Email",
                 "Password": "hasło"                   }
</script>

