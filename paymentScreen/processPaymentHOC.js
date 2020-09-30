import React, { Component } from 'react'
import { apiProcess } from '../../../common/api/api.js'
import { makeTitleCase } from '../../../common/util.js' //not included in examples
import ErrorMessagePopup from '../../../common/fieldErrorPopUpRefact.js' //Not included in examples
import UnderAgeModal from '../layout/paymentAgeErrorPopUp.js' //Not included in examples
import { createReservationTimeStamp } from '../paymentUtils.js'

export const withProcessPayment = (WrappedComponent) =>{
    return class withProcessPayment extends Component {

        constructor(props) {
            super(props);
            this.state = {
                processPaymentLoading : false,
                errorMessages : [],
                under21Warning : false,
            }
        }

        processPayment = (params) => {

            const onSuccess = params.onSuccess ? params.onSuccess : function() {}
            const onError = params.onError ? params.onError : function() {}
            const onNoInsuranceError = params.onNoInsuranceError ? params.onNoInsuranceError : function() {}
            const passedInValues = params.values
            const resID = params.resID
            const timezone = params.timezone

            this.setState({
                processPaymentLoading: true,
            })

            let paymentData = {}

            if(passedInValues) {
                //we make a copy of the data
                paymentData =  JSON.parse(JSON.stringify(passedInValues))
            }

            else if(this.props.paymentData !== {}) {
                //we make a copy of the data
                paymentData =  JSON.parse(JSON.stringify(this.props.paymentData));
            }

            else {
                //we have no payment data so we don't do anything.
                this.setState({
                    processPaymentLoading: false,
                })
                //let the developer know he's being dumb.
                console.error('The processPayment.js component needs payment either passed as a prop or through the processPayment main function.')
                return false
            }

            const apiURLSuffix = 'API_URL_SUFFIX_HERE/' + resID
         
            //prep the data to send to the server
            let reservationData = {
                start_at: createReservationTimeStamp(paymentData.start_at_date, paymentData.start_time, timezone), //need to go back and combine these
                end_at: createReservationTimeStamp(paymentData.end_at_date, paymentData.end_time, timezone),    //need to go back and combine these
                pricing_options: {
                    roadside_assistance: paymentData.roadside_assistance,
                    tire_protection: paymentData.tire_protection,
                    use_all_free_days: paymentData.use_all_free_days,
                    promotion_code: paymentData.promotion_code,
                    use_all_twisted_road_credits: paymentData.use_all_twisted_road_credits,
                    rider_insurance : paymentData.rider_insurance, 
                },
                message_request: paymentData.message_request,
                payments_card_uuid : paymentData.payments_card_uuid,
                terms_service_agreed : paymentData.terms_of_service
            }

            apiProcess(apiURLSuffix, reservationData, 'process-payment', 'Moto Booking Payment - ' + resID).then(function (responseData) {

                let resID = responseData.request_uuid
                onSuccess(resID)
                
            }.bind(this)).catch(function (responseData) {
                
                onError(responseData)

                if (responseData.errorResponseData.error_messages[0] === 'under-21') {
                    
                    //handle the special error case of riders under 21
                    this.setState({
                        processPaymentLoading: false,
                        under21Warning : true,
                    })
                    
                    return false
                }

                let formattedErrorMessages = [] 

                responseData.errorResponseData.error_messages.forEach((error, id) => {
                    formattedErrorMessages.push(makeTitleCase(error))
                })
                    
                this.setState({ 
                    processPaymentLoading: false,
                    errorMessages : formattedErrorMessages,
                })

            }.bind(this));

        }

    render() {

            const { errorMessages, under21Warning, under25Warning } = this.state

            return (
                <React.Fragment>
                    <ErrorMessagePopup 
                        errorMessages={errorMessages}
                        generalHeader={"Sorry, there were some issues with submitting your payment."}
                        generalMessage={false}
                    />  
                    <UnderAgeModal 
                        onClose={() => this.setState({ under21Warning : false })}
                        open={under21Warning}
                        message={"You must be 21 years or older to rent a motorcycle on Twisted Road."}
                    />
                    <WrappedComponent 
                        {...this.props} 
                        processPaymentLoading={this.state.processPaymentLoading}
                        doPayment={this.processPayment}
                    />
                </React.Fragment>
            )
        }
    }
}