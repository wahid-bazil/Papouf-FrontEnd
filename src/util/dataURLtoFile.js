import axios from "axios";
export const dataURLtoFile = (blobUrl, fileName) => {
	const config = { responseType: 'blob' };
	axios.get(blobUrl, config).then(response => {
		console.log('ll', response.data)
		const data = new FormData()
		data.append('img',response.data, fileName)

		// now upload
		const config = {
			headers: { 'Content-Type': 'multipart/form-data' }
		}
		axios.post('http://localhost:8000/api/variation/test', data, config).then(response => {
			console.log(response.data)
		})
	});
}
