
export const UseErrorMessages = () =>{
    return {
    getErrorMessages: (response, messageMap,fieldMap)=>{
          let messageMapUnion = { ...messageMapFixed ,...messageMap};
          let fieldMapUnion = {...fieldMapFixed ,...fieldMap}

        if(response._data){
            console.log(response);
            if(response.status == 401){
                return "Brak dostępu";
            }
            else if(response.status === 422){
                let messages = [];
                 response._data.errors.forEach((error) => {
                    console.log(error.error);
                    messages.push(`błąd: ${messageMapUnion[error.error] ?? error.error} w polu: ${fieldMapUnion[error.fieldName]?? error.fieldName }`);
                 }); 
                 
                 return messages.join('\n');
                 
            }
            else {

                if(response._data.error && response._data){
                    return ` Wystapił błąd ${messageMapUnion[response._data.error]}`
                }
                return "Wystapił błąd";
            }


        }
        return ""
          
    }
    }
}

const messageMapFixed = { 

}

const fieldMapFixed ={ }