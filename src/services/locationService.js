import axiosLocation from './axiosLocation';

const locationService = {
    getAddress: async (latitude, longitude) => {
        const response = await axiosLocation.get(`/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_KEY_GEOCODING_API}`)
            .then(({ ...response }) => response.data?.results[0])
            .catch(({ response }) => response);

        return response;
    },
    searchAddress: async (search) => {
        const response = await axiosLocation.get(`/map/api/place/autocomplete/json?input=${search}&language=pt_BR&key=${process.env.REACT_APP_KEY_GEOCODING_API}`)
            .then(({ ...response }) => response)
            .catch(({ response }) => response);
        return response;
    },
}

export default locationService;