import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router';
import store from '../store';

let alwaysPeddingPromise = new Promise(() => {});
export default function(option) {
        let defaultOption = {
                ...option,
                withCredentials: true,
                timeout: 5000
        };
        return axios(defaultOption)
                .then(response => response.data || JSON.parse(response.request.responseText))
                .then(result =>{
                        if(result.message !== '') store.commit('alert/open', result.message);
                        switch(result.status) {
                                case 200:
                                        return result.data;
                                case 401:
                                        Cookies.set('target', router.history.current.fullPath);
                                        router.replace('/login');
                                case 404:
                                case 199:
                                case 500:
                                default:
                                        return alwaysPeddingPromise;
                        }
                })
                .catch(error => {
                        store.commit('alert/open', error.message);
                        return alwaysPeddingPromise;
                });
}