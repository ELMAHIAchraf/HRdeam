import Echo from "laravel-echo"

import Pusher from 'pusher-js';

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'webSocketKey',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
    cluster: 'mt1',
    csrfToken: document.head.querySelector('meta[name="csrf-token"]').content,
    auth: {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        url: '/api/broadcasting/auth',
    },
});
export default window.Echo;