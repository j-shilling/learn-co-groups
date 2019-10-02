import axios from 'axios';

const forEachBatchesPageHelper = async (callback, source, page = 1) => {
    return axios.get('/api/batches', {
        params: {
            page: page
        },
        cancelToken: source.token
    }).then(({ data }) => {
        callback(data.batches);
        if (data.meta.current_page < data.meta.total_pages) {
            forEachBatchesPageHelper(callback, source, page + 1);
        }
    }).catch(thrown => {
        console.log(thrown.message);
    });
};

const API = {
    forEachBatchesPage: (callback) => {
        const source = axios.CancelToken.source();
        forEachBatchesPageHelper(callback, source);
        return (msg = 'Operation canceled by the user') => source.cancel(msg);
    }
};

export default API;
