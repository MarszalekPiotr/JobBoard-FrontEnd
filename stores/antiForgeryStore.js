import { defineStore } from 'pinia'

export const useAntiForgery = defineStore({
    id: 'antiForgery',
    state: () => {
        return {
            token: null
        };
    },
    actions: 
    {
        async getToken()
        {    
             await useWebApiFetch('/User/AntiForegryToken')
             .then(({data,error}) => {
                if(data.value){
                    this.token = data.value;
                }
                else if(error.value){
                    this.token = null;
                }
             })
        }
    }
});
