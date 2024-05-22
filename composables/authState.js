
export const useAuthState = () =>{
   
      const userStore = useUserStore();
      const accountStore = UseAccountStore();
        return {
        loggedInAccountSelected  :  computed(() =>{ return userStore.$state.loggedIn && accountStore.$state.accountSelected }),
        loggedInNoAccountSelected : computed(() => { return userStore.$state.loggedIn && !accountStore.$state.accountSelected}) ,
        candidateAccountCreated : computed(() => { return accountStore.$state.availableAccounts?.filter(acc => acc.accountType ===  candidateAccountType).length > 0}) ,
        anyAccountAvailable : computed(() => { return accountStore.$state.availableAccounts !== null && accountStore.$state.availableAccounts.length > 0})  ,
        availableAccounts :computed(() => { return accountStore.$state.availableAccounts}) ,
        accountType :computed(() => { return accountStore.$state.accountType}) ,
        currentCandidateAccount :computed(() => { return accountStore.$state.acountCandidate}) ,
        currentCompanyAccount :computed(() => { return accountStore.$state.accountCompany}),
        currentUser :computed(() => { return userStore.$state.userData }) ,
        userLoggedIn :computed(() => { return userStore.$state.loggedIn}) ,
        loading : computed(() =>{return userStore.$state.loading || accountStore.$state.loading}),

        async checkAuthStatus(){
            
            const userStore = useUserStore();
            const accountStore = UseAccountStore();
            await userStore.getLoggedUser();
            await accountStore.getSelectedAccount();
            await accountStore.getAccountsForCurrentUser();
            
        }
}
}