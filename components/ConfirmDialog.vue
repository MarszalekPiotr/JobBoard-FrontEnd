<template>
<v-dialog v-model="visible" width="500" absolute scroll-strategy="none">
    <v-card class="py-4">
        <v-card-title class="px-6 text-h5">
            <span>{{ viewModel.title }}</span>
        </v-card-title>

        <v-card-text>
            {{ viewModel.text }}
        </v-card-text>

        <v-card-actions class="pb-2 px-6">
            <v-spacer></v-spacer>
            <VBtn class="px-4" @click="cancel" :disabled="saving">
                Anuluj
            </VBtn>
            <VBtn :color="viewModel.buttonColor" variant="flat" class="px-4" @click="ok" :loading="saving">
                {{ viewModel.buttonText }}
            </VBtn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script setup>
const viewModel = ref({
    title:'',
    text:'',
    buttonText:'',
    buttonColor:''
})

const visible = ref(false);
const saving = ref(false);

const defaultModel = () =>{
    return{
        title: 'Potwierdź',
        text: 'czy na pewno?',
        buttonText: 'potwierdź',
        buttonColor: 'primary'
    }
}

let promiseCallbacks = {};

const show = (params) =>{
    visible.value = true,
    viewModel.value = { ...defaultModel(),...params} 
    
    return new Promise((resolve,reject) =>{
        promiseCallbacks = {resolve,reject}
    })

}

const ok = () =>{
    saving.value = true;
    if(promiseCallbacks?.resolve){
        promiseCallbacks.resolve(true);
    }
    saving.value = false;
    close();
}

const cancel = () => {
    saving.value = true;
    if(promiseCallbacks?.resolve){
        promiseCallbacks.resolve(false);
    }
    saving.value = false; 
    close();
}

const close = ()=>{
    visible.value = false;
}

defineExpose({
    show
});
</script>