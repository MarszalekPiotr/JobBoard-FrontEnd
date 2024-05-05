<template>
    <v-app id="inspire">

        <LoginDialog> </LoginDialog>

        <AccountDialog>  </AccountDialog>

        <v-app-bar v-if="userStore.$state.loggedIn === true" color="layout">
            <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-app-bar-title> JobBoard </v-app-bar-title>
            <v-spacer> </v-spacer>
            <VBtn icon="mdi-theme-light-dark" title="zmień motyw" @click="toggleTheme"> </VBtn>
        </v-app-bar>

        <v-navigation-drawer v-if="userStore.$state.loggedIn === true" color="layout" :order="mobile ? -1 : 0"
            v-model="drawer">
            <VList>
                <v-list-item lines="two">
                    <template v-slot:prepend>
                        <v-avatar color="brand" v-if="userStore.$state.userData?.email">
                            {{ userStore.$state.userData.email[0].toUpperCase() }}
                        </v-avatar>
                    </template>
                    <VListItemTitle v-if="accountStore.$state.accountType === companyAccountType ">{{ accountStore.$state.accountCompany.name}} </VListItemTitle>
                    <VListItemTitle v-if="accountStore.$state.accountType === candidateAccountType ">{{ accountStore.$state.acountCandidate.name}} </VListItemTitle>
                    <VListItemTitle v-if="accountStore.$state.accountSelected === false">Nie wybrano konta </VListItemTitle>
                    <VListItemSubtitle v-if="userStore.$state.userData?.email">{{ userStore.$state.userData.email }}
                    </VListItemSubtitle>
                </v-list-item>
                <VDivider></VDivider>
                <VListItem v-for="item in menuItems" :key="item.name" :title="item.name" :prepend-icon="item.icon"
                    :to="item.url">
                </VListItem>
                 
            </VList>
            <template v-slot:append>
                    <v-btn  block :prepend-icon="mdi-login"  @click ="logout"> 
                       Wyloguj się 
                    </v-btn>
                    </template>
        </v-navigation-drawer>

        <v-main>
            <div class="pa-4">
                <NuxtPage v-if="userStore.$state.loggedIn === true" />
            </div>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useTheme } from 'vuetify';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '~/stores/userStore';
import { UseAccountStore } from '~/stores/acountStore';

const currentTheme = useStorage('currentTheme', 'light')
const theme = useTheme();
const { mobile } = useDisplay();
const drawer = ref(null)
const userStore = useUserStore();
const accountStore = UseAccountStore();


const logout = () =>{
    
    userStore.logOut();
    
    

}

const companyAccountType = "Company";
const candidateAccountType = "Candidate";
 
const menuItems = [
    {
        url: "/applications",
        name: "moje aplikacje",
        icon: "mdi-briefcase"
    },
    {
        url: "/notifications",
        name: "powiadomienia",
        icon: "mdi-bell"
    },


]

function toggleTheme() {

    let newTheme = theme.global.current.value.dark ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    currentTheme.value = newTheme;
    userStore.getLoggedUser();

}

onMounted(() => {
    theme.global.name.value = currentTheme.value;
    userStore.getLoggedUser();
    accountStore.getAccountsForCurrentUser();
    accountStore.getSelectedAccount();
   

})

</script>
