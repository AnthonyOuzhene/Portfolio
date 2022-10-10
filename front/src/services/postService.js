import axios from 'axios';

import { baseUrl } from './apiClientService';

const endpoint = '/wp/v2/news';

export default {
    
    getAllPosts() {
        return axios.get(baseUrl + endpoint + '?_embed');
    },

    getSinglePost(postId) {
        return axios.get(baseUrl + endpoint + '/' + postId + '?_embed');
    }
}