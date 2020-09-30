import React, { Component } from 'react'
import { apiProcess } from '../../../common/api/api.js'
import { fullCountryFromShortCode, fullStateFromShortCode } from '../../../common/util.js' //not in examples

export const withListingCalls = (WrappedComponent) => {
    return class withListingCalls extends Component {

        constructor(props) {
            super(props);
            this.state = {
                listingCallLoading : false,
                errorMessages : [],
            }
        }

        createListing = ({ values }, callDescription)  => {
                        
            let apiURL = 'motorcycles' 
            let issuingCountryFull = fullCountryFromShortCode(values.issuing_country)
            let issuingStateFull = fullStateFromShortCode(values.issuing_country, values.issuing_state)
        
            let listingData = {
                make : values.make,
                model : values.model,
                license_plate : values.license_plate,
                license_plate_state : issuingStateFull,
                license_plate_country : issuingCountryFull,
                year : values.year,
                odometer_miles : values.odometer
            }
        
            return apiProcess(apiURL, listingData, 'create-bike-listing', callDescription).then(function (responseData) {
          
                return {
                    state : 'success',
                    id : responseData.motorcycle.motorcycle_uuid, 
                    pretty_id : responseData.motorcycle.motorcycle_prety_id,
                }
          
            }.bind(this)).catch(function (errorResponse) {
                
                throw errorResponse
            
            }.bind(this))
        }


        updateListing = (listingData, bikeID, callDescription, approval) => {
        
            let apiURL = 'motorcycles/' + bikeID   
            
            return apiProcess(apiURL, listingData, 'update-bike-listing', callDescription).then(function (responseData) {
                return responseData  
                    
            }.bind(this)).catch(function (responseData) {
                throw responseData
            }.bind(this))
        }

        fetchListing = (callDescription, bikeID) => {
            
            let fetchURL = 'owners/motorcycles/' + bikeID
            
            return apiProcess(fetchURL, false, 'edit-bike-listing-new', callDescription).then(function (responseData) {
                return responseData  
            }.bind(this)).catch(function (responseData) {
                throw responseData
            }.bind(this))
        }
        
        render() {

            const { listingCallLoading } = this.state

            return (
                <React.Fragment>
                    <WrappedComponent 
                        {...this.props} 
                        listingCallLoading={listingCallLoading}
                        createListing={this.createListing}
                        updateListing={this.updateListing}
                        fetchListing={this.fetchListing}
                    />
                </React.Fragment>
            )
        }
    }
}     