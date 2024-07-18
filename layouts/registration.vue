<template>

    <v-app>
        <v-main class="bg-brand">
         
            <NuxtPage class="pa-4" />
        </v-main>
    </v-app>

</template>

<style></style>

<script setup>

const authState = useAuthState();
onMounted( () => {
  authState.checkAuthStatus();
  
});
</script>