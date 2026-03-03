





import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";


(window as any).Pusher = Pusher;

export const echo = new Echo({
  broadcaster: "reverb",
  key: "local", 
  wsHost: "127.0.0.1",
  wsPort: 6001,
  forceTLS: false,
  enabledTransports: ["ws"],
  

  authorizer: (channel) => {
    return {
      authorize: async (socketId, callback) => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/broadcasting/auth",
            {
              socket_id: socketId,
              channel_name: channel.name,
            },
            {
              withCredentials: true, // ⭐ sends HttpOnly cookies
            }
          );

          callback(false, response.data);
          console.log( response.data)
        } catch (error) {
          callback(true, error);
          console.log('erro from custom channel authorizer')
        }
      },
    };
  },
});









 