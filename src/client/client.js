import axios from 'axios';

//const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchGetData = (uri) => {
    const url = `${uri}`;
    return axios.get(url)
        .catch(error => {
            console.error('Error fetching data from url: ', url, 'Error', error.message);
            throw error;
        });
};

const fetchPostData = (uri, payload) => {
    const url = `${uri}`;
    return axios.post(url, payload)
        .catch(error => {
            console.error('Error fetching data forURL: ', url, 'Error', error.message);
            throw error;
        });
};

const fetchPostDataWithAuth = (uri, payload) => {
    const token = localStorage.getItem('token');
    const url = `${uri}`;
    return axios.post(url, payload, {headers: {
        "accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    },
})
    .catch(error => {
        console.error('Error fetching data for URL: ', url, 'Error', error.message);
        throw error;
    });
};

const fetchGetDataWithAuth = async (uri) => {
    const token = localStorage.getItem('token');
    const url = `${uri}`;
    try {
        const response = await axios.get(url, {headers:
            {"Authorization": `Bearer ${token}`,}
        });
        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        console.error('Error fetching data: ', error);
    }
};

const fetchPostFileUploadWithAuth = async (uri, formData) => {
    const token = localStorage.getItem('token');
    const url = `${uri}`;
    try {
        const response = await axios.post(url, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  "Authorization": `Bearer ${token}`
                }
              });
        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        console.error('Error fetching data: ', error);
    }
};

export default fetchGetData;
export { fetchPostData, fetchPostDataWithAuth,fetchGetDataWithAuth, fetchPostFileUploadWithAuth };