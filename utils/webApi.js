import { hash } from 'ohash'
import { useAntiForgery } from '../stores/antiForgeryStore';

export  const  useWebApiFetch =  function (request, opts) {
    const config = useRuntimeConfig();
    const antiForgery = useAntiForgery();

    opts = opts || {}
    opts.headers = opts.headers || {}
    opts.headers['X-XSRF-TOKEN'] = antiForgery.$state.token;

    return  useFetch(request, { baseURL: config.public.BASE_URL,
        onRequest({ request, options }) {
            // Set the request headers
        },
        onRequestError(context) {

        },
        onResponse({ request, response, options }) {

        },
        onResponseError({ request, response, options }) {
            // Global error message
        },
        credentials: 'include',
        key : hash(['webapi-fetch', request, opts?.body, opts?.params, opts?.method, opts?.query]),
        ...opts});
}