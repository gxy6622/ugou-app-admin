import axios from 'axios';
import { MessageBox } from 'element-ui';
import Cookies from 'js-cookie';
import router from '../router';
//import store from '../store';

var alwaysPeddingPromise = new Promise(() => {});
export default function(option) {
        var defaultOption = {
                ...option,
                withCredentials: true,
                timeout: 5000
        };
        return axios(defaultOption)
                .then(response => response.data || JSON.parse(response.request.responseText))
                .then(result =>{
                        switch(result.status) {
                                case 200:
                                        if(result.message !== '')
                                                return MessageBox.alert(result.message, {
                                                        title: '成功', type: 'success'
                                                }).then(() => result.data);
                                        return result.data;
                                case 401:
                                        Cookies.set('target', router.history.current.fullpath);
                                        router.replace('/login');
                                case 404:
                                case 199:
                                case 500:
                                default:
                                        if(result.message !== '') MessageBox.alert(result.message, { title: '警告', type: 'warning' });
                                        return alwaysPeddingPromise;
                        }
                })
                .catch(error => {
                        MessageBox.alert(error.message, { title: '错误', type: 'error' });
                        return alwaysPeddingPromise;
                });
}