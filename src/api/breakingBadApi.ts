import axios from 'axios';


const breakingBadApi = axios.create({
    baseURL: 'https://www.breakingbadapi.com/api'
});




export default breakingBadApi;