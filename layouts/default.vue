<template>
    <v-app id="inspire">


        <v-app-bar color = "layout">
            <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-app-bar-title> JobBoard </v-app-bar-title>
            <v-spacer> </v-spacer>
            <VBtn icon ="mdi-theme-light-dark" title ="zmień motyw" @click="toggleTheme">  </VBtn>
        </v-app-bar>

        <v-navigation-drawer color = "layout" :order="mobile ? -1 : 0" v-model="drawer">
            <VList>
                <VListItem v-for ="item in menuItems" :key ="item.name" :title ="item.name" :prepend-icon="item.icon" :to ="item.url"> </VListItem>
            </VList>
        </v-navigation-drawer>

        <v-main>
            <div class="pa-4">
                <NuxtPage />
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

const currentTheme  = useStorage('currentTheme','light')
const theme = useTheme();
const { mobile } = useDisplay();
const drawer = ref(null)
const userStore = useUserStore();

const menuItems = [
    {
        url:"/applications",
        name:"moje aplikacje",
        icon : "mdi-briefcase"
    },
    {
        url:"/notifications",
        name:"powiadomienia",
        icon : "mdi-bell"
    },

    
]

function toggleTheme(){

    let newTheme = theme.global.current.value.dark ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    currentTheme.value = newTheme;
    userStore.getLoggedUser();

}

onMounted(() => {
    theme.global.name.value = currentTheme.value;
     userStore.getLoggedUser();

})

</script>
