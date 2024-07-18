import { defineStore } from "pinia";
export const UseAccountStore = defineStore({
    id: 'account-store',
    state: () => {
     return {
      loading: false,
      accountCompany: null,
      acountCandidate: null,
      accountSelected: false,
      accountType:  "",
      availableAccounts: null,
     }
    } ,
    actions: {

        // nowa metoda get selected account
        async getSelectedAccount(){
           await useWebApiFetch('User/GetCurrentAccount')
           .then(async ({data,error}) => {
             if(data.value){
                this.accountType = data.value.accountType;
                 if(this.accountType === 'CandidateAccount')  {
                     await useWebApiFetch('/User/GetCurrentCandidateAccount')
                     .then(({data,error}) => {
                        if(data.value){
                             this.acountCandidate = data.value;
                             this.accountSelected = true;
                             this.accountType = candidateAccountType;
                             this.accountCompany = null; 
                        }
                        else if(error.value){
                            this.acountCandidate = null;
                            this.accountSelected = false;
                            this.accountType = "";
                            this.accountCompany = null; 

                        }
                     })
                 }
                 else if(this.accountType === 'CompanyAccount'){
                    await useWebApiFetch('/User/GetCurrentCompanyAccount')
                        .then(({data,error}) => {
                            if(data.value){
                                this.acountCandidate = null;
                                this.accountSelected = true;
                                this.accountType = companyAccountType;
                                this.accountCompany = data.value; 
                            }
                            else if(error.value){
                                this.acountCandidate = null;
                                this.accountSelected = false;
                                this.accountType = "";
                                this.accountCompany = null; 
    
                            }
                        })
                 }                 
 
             }
             else if(error.value){
                this.acountCandidate = null;
                this.accountSelected = false;
                this.accountType = "";
                this.accountCompany = null; 
             }
           } )   


        },
    async  getSelectedAccountOld(){
       await useWebApiFetch('/User/GetCurrentCandidateAccount')
         .then( async ({data ,error}) =>{
             if(data.value){
                this.acountCandidate = data.value;
                this.accountSelected = true;
                this.accountType = candidateAccountType;
                this.accountCompany = null; 

             }
             else if(error.value){
                
              await useWebApiFetch('/User/GetCurrentCompanyAccount')
                    .then(({data,error}) => {
                        if(data.value){
                            this.acountCandidate = null;
                            this.accountSelected = true;
                            this.accountType = companyAccountType;
                            this.accountCompany = data.value; 
                        }
                        else if(error.value){
                            this.acountCandidate = null;
                            this.accountSelected = false;
                            this.accountType = "";
                            this.accountCompany = null; 

                        }
                    })
                

             }
         } )
         .finally(() => {
             this.loading = false
         })
 
     },
    async getAccountsForCurrentUser(){
       await useWebApiFetch('/User/GetAccountsForCurrentUser')
        .then(({data,error}) => {
          if(data.value){
              console.log(data.value);
              this.availableAccounts = data.value
          }
          else if(error.value){
            this.availableAccounts = null;
          }
        })
        .finally(() => {

        })
     },
      createCandidateAccount(CreateCandidateAccountViewModel){
        this.loading = true ;
        useWebApiFetch('/User/CreateCandidateAccount', {
            method: 'POST',
            body: { ...CreateCandidateAccountViewModel.value },
            onResponseError: ({ response }) => {
                errorMsg.value = getErrorMessages(response, {}, {})
            },
        })
        .then((response) => {
             if(response.data.value){
                const globalMessageStore = useMessageStore();
                const router = useRouter();
                globalMessageStore.showSuccessMessage("utworzono standardowe konto");
                this.acountCandidate = response.data.value;
                this.accountSelected = true;
                this.accountType = candidateAccountType;
                router.push({ path: '/' })   
             }
        })
        .finally(() => {
           this.loading = false;
            
        })
    
     },
     createCompanyAccount(CreateCompanyAccountViewModel){
        this.loading = true;
        useWebApiFetch('/User/CreateCompanyAccount', {
            method: 'POST',
            body: { ...CreateCompanyAccountViewModel.value },
            onResponseError: ({ response }) => {
                errorMsg.value = getErrorMessages(response, {messageMap}, {fieldMap})
                
            },
        })
            .then((response) => {
                if (response.data.value) { 
                const globalMessageStore = useMessageStore();
                const router = useRouter();
                globalMessageStore.showSuccessMessage("utworzono company konto");
                this.accountCompany = response.data.value;
                this.accountSelected = true;
                this.accountType = companyAccountType;
                router.push({ path: '/' })   
                }
                
            })
            .finally(() => {
                this.loading = false;
                
    
            })
        }
    }
}
)

const companyAccountType = "CompanyAccount";
const candidateAccountType = "CandidateAccount";

 