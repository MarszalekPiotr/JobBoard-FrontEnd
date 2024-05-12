import { defineStore } from 'pinia'

export const useMessageStore = defineStore({
    id: 'message-store',
    state: () => {
        return {
            message: null
        };
    },
    actions: {
        showMessage(data) {
            this.$state.message = data;
        },
        showSuccessMessage: function(text) {
            this.showMessage({
                text: text,
                type: "Success"
            });
        },
        showErrorMessage: function(text) {
            this.showMessage({
                text: text,
                type: "Error"
            });
        }
    }
});
