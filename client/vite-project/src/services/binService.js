import axios from "../axios";
const getAllBin = () => {
    return axios.get('/api/get-all-bin', {})
}

const addNewBin = (data) => {
    return axios.post('/api/add-new-bin', data)
}

const updateBin = (data) => {
    return axios.put('/api/update-bin', data)
}

const deleteBin = (id) => {
    return axios.delete('/api/delete-bin', {
    data: {
        id: id,
      }

    })
}
 
export {getAllBin, addNewBin, updateBin, deleteBin}