export default function({$axios, store}) {
    $axios.onError(error => {

        if (error.response.status === 422){
        
            store.dispatch("validation/setErrors", error.response.data)
        }

        if(error.response.status === 404)
        {
            store.dispatch("validation/set404Errors", error.response.data)
        }

        return Promise.reject(error)
    })

    $axios.onRequest(() => {
        store.dispatch("validation/clearErrors")
    })
}