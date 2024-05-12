<template>
<v-snackbar v-model ="visible" :color = "currentColor">  
  {{ currrentMessage?.text  }}
  
  <template v-slot:actions>
    <v-btn variant = "text" @click ="visible = false"> OK </v-btn>
     </template>


</v-snackbar> 
</template>
<style>
</style>

<script setup>


const visible = ref(true);
const globalMessageStore = useMessageStore();
globalMessageStore.$subscribe((mutation, state) => {    
    if (state.message && state.message.text) {
        visible.value = false;
        nextTick(() => {
            visible.value = true;
        });
    }
})
const currrentMessage = computed(() => {
    return globalMessageStore.$state.message;
})

const currentColor = computed(() => {
    if(currrentMessage.value?.type === "Success"){
        return "success";
    }
    else if(currrentMessage.value?.type === "Error"){
        return "error";
    }
    else{
        return "primary";
    }
})


</script>