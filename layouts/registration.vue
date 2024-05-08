<template>

    <v-app>
        <v-main class="bg-brand">
         
            <NuxtPage class="pa-4" />
        </v-main>
    </v-app>

</template>

<style></style>

<script setup>

const userStore = useUserStore();
const accountStore = UseAccountStore();
onMounted( () => {
  userStore.getLoggedUser();
  accountStore.getAccountsForCurrentUser();
  console.log("elooo");

});
</script>