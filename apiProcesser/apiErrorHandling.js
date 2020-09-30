import {
    AIRBRAKE_API_KEY,
    AIRBRAKE_PROJECT_ID,
    BUILD_ENV
} from '../constants.js';
import { apiDebug } from './api.js'
import AirbrakeClient from 'airbrake-js';

const airbrake = new AirbrakeClient({
    projectId: AIRBRAKE_PROJECT_ID,
    projectKey: AIRBRAKE_API_KEY,
    keysBlacklist: [ //filter out some sensitive data
        'password', 
        'ssn', 
        'owner_ssn',
      ],
});

airbrake.addFilter(function(notice) {
    if (BUILD_ENV !== 'production') {
         //Ignore errors from dev sessions.
        return false;
    }
    return notice;
});


export const apiErrorHandling = (apiType, error, data, componentDesc, processName, url) => {
    
    let errorCode = error.response.status
    let responseData = error.response.data

    airBrakeOnAPICall(
        apiType,
        error,
        data,
        componentDesc,
        processName,
        url
    )

    //we just transform some data here so that the frontend has an easy object to parse
    var errorInfo = {
      errorCode: errorCode,
      errorResponseData: responseData,
    }
    return errorInfo;
}


const airBrakeOnAPICall = (apiType, error, data, componentDesc, processName, url) => {

  let airBrakeInfo = {
      error: error,
      environment: { env: BUILD_ENV },
      params: {
          data_sent: data,
          api_type: apiType,
          react_component: componentDesc,
          api_call: processName,
          api_url: url,
      }
  }
  if (error.response) {
      airBrakeInfo.params.error_status = error.response.status 
      airBrakeInfo.params.error_data = error.response.data  
      airBrakeInfo.params.error_headers = error.response.headers  
      if(error.response.data.error_messages) {
          airBrakeInfo.error = error.response.status + " - " + error.response.data.error_messages[0] + " - " + componentDesc
      }
    } else if (error.request) {
      airBrakeInfo.params.error_request = error.request
    } else {
      airBrakeInfo.params.error_data = error.message
    }
    airbrake.notify(airBrakeInfo)
}