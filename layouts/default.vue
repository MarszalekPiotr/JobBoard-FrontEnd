<template>
    <v-app id="inspire">

        <LoginDialog> </LoginDialog>

        <AccountDialog> </AccountDialog>

        <v-app-bar v-if="authStore.$state.userLoggedIn" color="layout">
            <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-app-bar-title> JobBoard </v-app-bar-title>
            <v-spacer> </v-spacer>
            <VBtn icon="mdi-theme-light-dark" title="zmień motyw" @click="toggleTheme"> </VBtn>
        </v-app-bar>

        <v-navigation-drawer v-if="authStore.$state.userLoggedIn" color="layout" :order="mobile ? -1 : 0"
            v-model="drawer">
            <VList>
                <v-list-item lines="two">
                    <template v-slot:prepend>
                        <v-avatar color="brand" v-if="userStore.$state.userData?.email">
                            {{ authStore.$state.currentUser.email[0].toUpperCase() }}
                        </v-avatar>
                    </template>
                    <VListItemTitle v-if="authStore.$state.currentCompanyAccount">{{
                        accountStore.$state.accountCompany.name }} </VListItemTitle>
                    <VListItemTitle v-if="authStore.$state.currentCandidateAccount">{{
                        accountStore.$state.acountCandidate.name }} </VListItemTitle>
                    <VListItemTitle v-if="authStore.$state.loggedInNoAccountSelected">Nie wybrano konta
                    </VListItemTitle>
                    <VListItemSubtitle v-if="authStore.$state.currentUser?.email">{{ authStore.$state.currentUser.email
                        }}
                    </VListItemSubtitle>
                </v-list-item>
                <VDivider></VDivider>
                <VListItem v-for="item in menuItems" :key="item.name" :title="item.name" :prepend-icon="item.icon"
                    :to="item.url">
                </VListItem>

            </VList>
            <template v-slot:append>
                <v-btn block :prepend-icon="mdi - login" @click="logout">
                    Wyloguj się
                </v-btn>
            </template>
        </v-navigation-drawer>

        <v-main>
            <div class="pa-4">
                <NuxtPage v-if="authStore.$state.loggedInAccountSelected" />
            </div>
        </v-main>
    </v-app>

    <ConfirmDialog ref="confirmDialog"> </ConfirmDialog>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useTheme } from 'vuetify';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '~/stores/userStore';
import { UseAccountStore } from '~/stores/acountStore';
import { useAntiForgery } from '~/stores/antiForgeryStore';
import { useAuthState } from '~/composables/authState';


const confirmDialog = ref(null);
const currentTheme = useStorage('currentTheme', 'light')
const theme = useTheme();
const { mobile } = useDisplay();
const drawer = ref(null)
const userStore = useUserStore();
const accountStore = UseAccountStore();
const router = useRouter();
const authStore = useAuthStore();
const authState = useAuthState();
const globalMessageStore = useMessageStore();
const antiForgery = useAntiForgery();

const logout = () => {
    const params = {
        title: 'Wylogowanie',
        text: 'Czy na pewno chcesz się wylogować?',
        buttonText: 'Wyloguj',
        buttonColor: 'Primary'
    }
    confirmDialog.value.show(params).
        then(confirm => {
            if (confirm) {
                userStore.logOut();
            }
        })

}

const companyAccountType = "CompanyAccount";
const candidateAccountType = "CandidateAccount";


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
    {
        url: "/myAccounts",
        name: "Moje Konta",
        icon: "mdi-account"
    }


]

function toggleTheme() {

    let newTheme = theme.global.current.value.dark ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    currentTheme.value = newTheme;
    userStore.getLoggedUser();

}

await antiForgery.getToken()
onMounted(async () => {
    theme.global.name.value = currentTheme.value;
    await authStore.checkAuthStatus();
    await authState.checkAuthStatus();

})

</script>
