import { API_URL, MOCK_URL,BUILD_ENV } from "../constants.js"
import { CALL_LIBRARY } from "./callLibrary/callLibrary.js"
import * as Cookies from "js-cookie"
import { apiGET } from "./apiGET.js"
import { unauthenticate } from "../auth.js"
import createAuthRefreshInterceptor from 'axios-auth-refresh';
const axios = require("axios")

const refreshAuthLogic = failedRequest => {
  return (
    axios.post( 
      API_URL + 'users/sessions/refresh/', 
      {
        refresh_token : Cookies.get('userRefreshToken') ? Cookies.get('userRefreshToken') : null //Server currently only errors on null, ticket in backend backlog 
      }, 
      { skipAuthRefresh : true }
    ).then(tokenRefreshResponse => {
      Cookies.set('userToken', tokenRefreshResponse.data.token)
      failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
      return Promise.resolve();
    })
  )
}

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.data.error_messages) {
    if(error.response.data.error_messages[0] === 'Invalid Refresh Token.') {
      error.response.data.keep_loading = true //we use keep_loading around the app to show that we have an error, but we want to keep loading while the system does something secret..like redirect to a logout page
      unauthenticate(true) //logou the user on bad refresh token
    }
  }
  return Promise.reject(error);
});

createAuthRefreshInterceptor(axios, refreshAuthLogic);


export const apiProcess = (urlSuffix, data, processName, componentDesc) => {
  
  //urlSuffix:  string, "motorcycles/search/..."
  //data : object or false for GETS "{...}"
  //processName: string, short code to look this up in the apiProcess CallLibrary.js object
  //componentDesc: this is used or error tracking, try to be very specific on the page, uuid, component, etc.

  //if we can't find the process name, we abort early. This is a dev helper only.
  if (!CALL_LIBRARY.hasOwnProperty(processName) && BUILD_ENV === 'development') { 
    apiDebug("ERROR: ", "No Process Name")
    return Promise.reject({
      errorCode: 'n/a',
      errorResponseData: {
        error_messages : [
          "No API Process Name Found in Call Library"
        ]
      }
    }) 
  }
  
  let useMock = false //we assume we aren't using mock be default
  let API_Prefix = API_URL //whatever the env API URL, we overwrite this later if the processName's mock bit in callLibrary is set to TRUE

  //we set up the base header here
  let apiConfig = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  
  //if we do have a userToken cookie, then attach it regardless of if we need it auth or not
  //Never know what the backend kids have changed...
  if(Cookies.get("userToken")) {
    apiConfig['headers']['Authorization'] = "Bearer " + Cookies.get("userToken")
  }
  
  if(!CALL_LIBRARY[processName].requires_auth) {
    apiConfig['skipAuthRefresh'] = true
  }

  //we set the apiTYPE
  const apiType = CALL_LIBRARY[processName].api_type;

  //check for mock mode
  //this allows us to use POSTMAN for calls and switch back and forth
  if ( CALL_LIBRARY[processName].use_mock === true || localStorage.getItem("twisted-mock") === "use-mock") { //if global mock mode or local processName mock mode is on
    if (!CALL_LIBRARY[processName].hasOwnProperty("over_ride_global_mock")) { //this bit will always force a staging or production server call and never use postman. Good for things like 3rd party API calls that can not be mocked.
      useMock = true;
      API_Prefix = MOCK_URL;
      urlSuffix = CALL_LIBRARY[processName].mock_endpoint;
    }
  }

  //encode the URI
  let encodedURI = window.encodeURI(API_Prefix + urlSuffix)

  if (apiType === "GET") {

    //stuff in the the data
    if (data) { 
      apiConfig['params'] = data
    }

    return apiGET(data, apiConfig, encodedURI, processName, componentDesc, axios).then(function(response) {
      return response
    }).catch(function(error) {
      throw error
    })
  }
  
  if (apiType === "POST") {
    //function to handle POST
  }
  
  if (apiType === "DELETE") {
    if (data) { 
      apiConfig['data'] = data
    }
    //function to handle DELETE
  } 
  
  if (apiType === "PATCH") {
    //function to handle PATCH
  }

  if (apiType === "PUT") {
    //function to handle PUT
  }
}