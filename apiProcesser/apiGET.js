import { apiErrorHandling } from "./apiErrorHandling";
import { CALL_LIBRARY } from "./callLibrary/callLibrary.js"
const axios = require("axios")

export const apiGET = (data, config, url, processName, componentDesc, axios) => {
    return axios.get(url, config).then(function(response) {        
        
        //if there is a transformer attached to this data call
        if (CALL_LIBRARY[processName].hasOwnProperty("transFormData")) {
            return CALL_LIBRARY[processName].transFormData(response.data);
        }

        //if we don't transform the data, we just return it as usual
        return response.data;
    })
    .catch(function(error) {
        if (error.response) { //we check for a basic response
        if (error.response.status === 404) {
            window.location = "/404" //if we get a 404, then do the 404
        } else {
            throw apiErrorHandling(
                "GET", 
                error, 
                data, 
                componentDesc,
                processName, 
                url
            )
        }
    }
  })
} 




