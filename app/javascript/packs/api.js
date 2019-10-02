

// const CancelToken = axios.CancelToken;
// let cancel;

// axios.get('/user/12345', {
//   cancelToken: new CancelToken(function executor(c) {
//     // An executor function receives a cancel function as a parameter
//     cancel = c;
//   })
// });

// // cancel the request
// cancel();

const axios = require('axios');
const source = axios.CancelToken.source();

const API = {
    cancelGetBatchesPage: function() {
        source.cancel('Operation canceled by the user.');
    },

    getBatchesPage: function(page = 1) {
        return axios.get('/api/batches', {
            params: {
                page: page
            },
            cancelToken: source.token
        });
    }
};

export default API;
