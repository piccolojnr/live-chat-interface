import { io } from "socket.io-client";
import { BASE_API_URL } from "./constants";



const socket = io(BASE_API_URL, {
    withCredentials: true,
    auth: {
        token: localStorage.getItem('token'),
    }
});

export default socket;
