import axios from 'axios';

const instance = axios.create({
 baseURL: 'https://vekar-react-burger-app-default-rtdb.firebaseio.com/'
});

export default instance;