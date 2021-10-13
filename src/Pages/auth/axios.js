import axios from 'axios';

const baseURL = 'https://papouf-backend-api.herokuapp.com/';
const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,

		'Content-Type': 'application/json',
		accept: 'application/json',
		'deviceid': localStorage.getItem('device_id')


	},



});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {

			window.location.reload();
			return Promise.reject(error);
			
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			localStorage.clear()
			window.location.reload();
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				try {

					const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));



					// exp date in token is expressed in seconds, while now() returns milliseconds:
					const now = Math.ceil(Date.now() / 1000);


					if (tokenParts.exp > now) {
						return axiosInstance
							.post('/token/refresh/', { refresh: refreshToken })
							.then((response) => {

								localStorage.setItem('access_token', response.data.access);
								axiosInstance.defaults.headers['Authorization'] =
									'JWT ' + response.data.access;
								originalRequest.headers['Authorization'] =
									'JWT ' + response.data.access;

								return axiosInstance(originalRequest);
							})
							.catch((err) => {

							});
					}

					else {

						localStorage.clear()
						window.location.reload();
					}
				}
				catch {

					localStorage.clear()
					window.location.reload();
				}
			}
		}
		else if (
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		){
			localStorage.clear();
			window.location.reload();
		}
		else {	
			
			
		}

		// specific error handling done elsewhere
		//return Promise.reject(error);
	}
);

export default axiosInstance;