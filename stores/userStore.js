
import { defineStore } from "pinia";
import { useWebApiFetch } from "~/utils/webApi";

export const useUserStore = defineStore({
   id: 'user-store',
   state: () => {
    return {
     loading: false,
     userData: null,
     loggedIn: false
    }
   } ,
   actions: {
    async getLoggedUser(){
      await useWebApiFetch('/User/GetCurrentUser')
        .then(({data ,error}) =>{
            if(data.value){
                this.loggedIn = true;
                this.loading = true;
                this.userData = data.value;
                console.log({elo: data.value})
            }
            else if(error.value){
                this.loggedIn = false;
                this.loading = true;
                this.userData = null;
            }
        } )
        .finally(() => {
            this.loading = false
        })

    },
    logOut(){
         useWebApiFetch('/User/Logout', {method:'POST'})
         .then((response) =>{
             if(response.data.value){
                this.loggedIn = false;
                this.userData = null;
             }
         } )
         .finally(() => {
            
         })
    }
   }
})