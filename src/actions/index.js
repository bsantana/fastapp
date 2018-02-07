import {API} from '@doctorweb/endpoints';
// import axios from 'axios';

// Coloque os actions creators aqui

const REQUEST_URL = 'https://jsonplaceholder.typicode.com';

export function fetchPosts() {
    //return (dispatch, getState) => {
    // fazer pedidos HTTP para obter todos os posts
    let server = new API(REQUEST_URL)
    console.log('EXECUTAMOS O FETCH POSTS')

    // axios.get(`${REQUEST_URL}/posts`)
    // .then(response => {
    //     console.log(response);
    // })

    const request = server.get(`/posts`);
    
    return {
        type: 'FETCH_POSTS',
        payload: request // Promise response
    };
    //}
};

export const fetchPost = (id) => {
    let server = new API(REQUEST_URL)

    const request = server.get(`/posts/${id}`);
    
    return {
        type: 'FETCH_POST',
        payload: request // Promise response
    };
}

// export function receiveInvites(invites) {
//     return {
//         type: 'FETCH_POSTS',
//         payload: {
//             invites: invites,
//         }
//     }
// }