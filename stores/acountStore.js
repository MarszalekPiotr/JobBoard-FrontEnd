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
      getSelectedAccount(){
        useWebApiFetch('/User/GetCurrentCandidateAccount')
         .then(({data ,error}) =>{
             if(data.value){
                this.acountCandidate = data.value;
                this.accountSelected = true;
                this.accountType = candidateAccountType;
                this.accountCompany = null; 

             }
             else if(error.value){
                
                useWebApiFetch('/User/GetCurrentCompanyAccount')
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
     getAccountsForCurrentUser(){
        useWebApiFetch('/User/GetAccountsForCurrentUser')
        .then(({data,error}) => {
          if(data.value){
             console.log(data);
             console.log(data.value);
              this.availableAccounts = data.value
          }
          else if(error.value){
            this.availableAccounts = null;
          }
        })
        .finally(() => {

        })
     }
     }
    }
)

const companyAccountType = "Company";
const candidateAccountType = "Candidate";

 