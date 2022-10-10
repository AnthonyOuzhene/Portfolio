import axios from 'axios';

import { baseUrl } from './apiClientService';

const endpoint = "/wp/v2/tag";

export default {
    getTags() {
        return axios.get(baseUrl + endpoint);
    }
}