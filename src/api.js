import axios from "axios"

const urlProv =  "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"

export const getProvinsi = async() => {
    const movie = await axios.get(urlProv)
    return movie.data
}