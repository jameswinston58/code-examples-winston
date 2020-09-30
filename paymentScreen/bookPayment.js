import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PaymentForm from './layout/paymentForm.js'
import BookingPaymentSkeleton from './layout/bookPaymentSkeleton.js'
import { apiProcess } from '../../common/api/api.js'
import { trackPaymentPageView } from '../../tracking/paymentTracking.js'

const defaultState = {
    loading : true,
    hasErrors : false,
    hasResData : false,
    resData : null
}

class PaymentPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = defaultState
    }

    componentDidMount() {
        this.loadReservation()    
    }

    loadReservation = () => {
        
        let fetchURL = "riders/requests/" + this.props.match.params.reservationID

        apiProcess(fetchURL, false, 'payment-screen', 'Load Payment Screen').then(function (responseData) {
            
            this.setState({
                loading : false,
                hasErrors : false,
                hasResData : true,
                resData : responseData
            })
            
            trackPaymentPageView(responseData) //Tracking files not included in example

        }.bind(this)).catch(function (errorResponse) {
            
            this.setState({
                loading : false,
                hasErrors : false,
                hasResData : true,
                resData : null
            })

        }.bind(this));
    }


    render() {

        const { 
            loading, 
            hasErrors, 
            hasResData, 
            resData 
        } = this.state

        return (
            
        <div className="page-container payments-page-container">    
            {!loading && hasErrors && (
                <Redirect to='/404' />
            )}
            {loading && !hasResData && (
                <BookingPaymentSkeleton />
            )}
            {!loading && hasResData && (
                <PaymentForm 
                    resData={resData} 
                    resID={this.props.match.params.reservationID}  
                    isMobile={this.props.isMobile} 
                /> 
            )}
        </div>
        )
    }
}

export default PaymentPage