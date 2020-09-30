import React, { Component } from 'react'

//Element Imports
import * as Yup from 'yup'
import { withRouter } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Button } from 'semantic-ui-react'
import { compose } from 'recompose'

//Payment Form Sections
import PaymentHeader from '../paymentFields/paymentHeader.js'
import PaymentTimeSelector from '../paymentFields/paymentTimeSelector.js'
import PaymentRoadSideAssistance from '../paymentFields/paymentRoadsideAssistanceInput.js' //not included in examples
import PaymentTireProtection from '../paymentFields/paymentTireProtectionInput.js' //not included in examples
import InsuranceOptionsInput from '../paymentFields/insuranceSelectionBlock.js'
import PaymentMethodsSection from '../paymentFields/paymentMethodsSection.js' //not included in examples
import PaymentWelcomeMessage from '../paymentFields/paymentWelcomeMessage.js' //not included in examples
import PaymentSecurityDeposit from '../paymentFields/paymentSecurityDeposit.js' //not included in examples
import PaymentTermsOfService from '../paymentFields/paymentTermsOfService.js' //not included in examples
import PaymentPromoCode from '../paymentFields/paymentPromoCodes.js' //not included in examples
import PaymentRightColumn from './bookPaymentRightColumn.js' //not included in examples
import PaymentMobileCTAView from './bookMobileCTAView.js' //not included in examples
import ErrorMessagePopup from '../../../common/fieldErrorPopUpRefact.js' //not included in examples
import PricingSummary from '../../../pricing/pricingSummary.js'//not included in examples

//Payment Form Function and Utils
import { prepStartAndEndTimeForBackend } from '../paymentUtils.js'
import { withGetPricing } from '../../../pricing/pricing.js' //not included in examples
import { withProcessPayment } from '../processPaymentHOC.js'
import { withWizard } from '../../../account/infoWizard/callUserWizard.js' //Not included in examples
import { trackPaymentAttempt, trackPaymentSuccess } from '../../../tracking/paymentTracking.js' //Not included in examples


const intialValues = (data) => {
    
    return {
        start_at_date: data.reservation_start_date,
        end_at_date: data.reservation_end_date,   
        start_time : null,
        end_time : null,
        roadside_assistance: true,
        tire_protection: true,
        rider_insurance : data.default_insurance ? data.default_insurance : '',
        rider_insurance_name : data.default_insurance_name ? data.default_insurance_name : '',
        payments_card_uuid : data.default_payment_method, //the component will set this on mount
        promotion_code: '',
        use_all_free_days: true,
        use_all_twisted_road_credits: true,
        message_request: '', 
        terms_of_service : false,
    }
}

const paymentFormValidation =  Yup.object().shape({
    start_time: Yup.number().nullable().required("Start Time is Required."),
    end_time: Yup.number().nullable().required("End Time is Required."),
    rider_insurance: Yup.string().nullable().required("Insurance Selection is Required."),
    payments_card_uuid: Yup.string().nullable().required("Please select a payment method."),
    message_request : Yup.string().nullable().required("Message request is required."),
    terms_of_service : Yup.bool().oneOf([true], 'You must agree to our terms of service.').required('You must agree to our terms of service.'),
})

class PaymentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            declinedInsurance : false, //TODO: We need this bit for the wizard. I'd like to do something cleaner here, but I'm not sure what.
            insuranceOptions: this.props.resData.insurance_options
        }
    }
    
    componentDidMount() {
        this.props.setPricingInitialValues(this.props.resData.pricing) //from withPricing
    }

    handleForm = (setFieldError, values, setSubmitting) => {

        paymentFormValidation.validate({
            start_time: values.start_time,
            end_time :  values.end_time,
            rider_insurance : values.rider_insurance,
            payments_card_uuid : values.payments_card_uuid,
            message_request : values.message_request,
            terms_of_service : values.terms_of_service
        }, { abortEarly: false }).then(function (valid) {

            //Validation Success
            this.props.callWizard({
                onSuccess : () => {
                    this.handleProcessPayment(values, setSubmitting, setFieldError)
                },
                onTrigger: () => {
                    trackPaymentAttempt('Info Wizard Triggered', {
                        reservation_id : this.props.resID
                    })
                    setSubmitting(false)
                },
                onError : () => { 
                    trackPaymentAttempt('Info Wizard Error', {
                        reservation_id : this.props.resID
                    })
                    setSubmitting(false)
                },
                wizardType : "book", //Tell the information wizard which type of conversion this is
                wizardDescription : "Wizard Call From Payment Page - " + this.props.resID, //Give the wizard a component description tracking and/or error reporting
                includeInsurance : this.state.declinedInsurance //tell the wizard to take 
            })
            
        }.bind(this)).catch(function (responseData) {
            
            //Bad Validation
            let errorMessages = []
            for (let i = 0; i < responseData.inner.length; i++) {
                setFieldError(responseData.inner[i]['path'], responseData.inner[i]['message'])
                errorMessages.push(responseData.inner[i]['message'])
            }
            this.setState({
                errorMessages : errorMessages,
            })
            setSubmitting(false)
        }.bind(this));
    }

    handleProcessPayment = (values, setSubmitting, setFieldError) => {

        setSubmitting(true)

        this.props.doPayment({
            onSuccess : (resID) => {
                trackPaymentSuccess(
                    this.props.resData, 
                    resID, this.props.pricingInfo, 
                    values,
                    () => this.props.history.push('SUCCESS_PAGE_URL_HERE/' + resID + '/success')
                )
            },
            onNoInsuranceError : (insuranceErrorCode, insuranceErrorMessage) => {
                //If there is a special insurance error case, handle it here
                trackPaymentAttempt('Payment Error', {
                    reservation_id : this.props.resID,
                    raw_error_data : insuranceErrorCode
                })

                //scroll the page back up
                document.getElementById("insurance-options-wrap").scrollIntoView()

                //remove decline option from Insurance
                let insuranceOptions = this.props.resData.insurance_options
                insuranceOptions.forEach((option, i) => {
                    if(option.package_type === 'decline') {
                        insuranceOptions.splice(i, 1)
                    }
                })
                setFieldError('rider_insurance', insuranceErrorMessage)
                this.setState({
                    insuranceOptions: insuranceOptions               
                })
            },
            onError : (responseData) => {
                trackPaymentAttempt('Payment Error', {
                    reservation_id : this.props.resID,
                    raw_error_data : responseData
                })
                setSubmitting(false)
            },
            values : values,
            resID : this.props.resID,
            timezone : this.props.resData.bike_timezone
        })
    }

    handlePricingLookUp = (currValues, id, newValue) => {

        let values = currValues

        values[id] = newValue

        this.props.doPricing({
            pricingOptions : {
                roadside_assistance: values.roadside_assistance,
                tire_protection: values.tire_protection,
                rider_insurance : values.rider_insurance,
                promotion_code: values.promotion_code ? values.promotion_code : null, //set this to null
                use_all_free_days: values.use_all_free_days,
                use_all_twisted_road_credits: values.use_all_twisted_road_credits,
                motorcycle_pretty_id : this.props.resData.bike_id,
                time_info : 
                    prepStartAndEndTimeForBackend({
                        start_time : values.start_time,
                        end_time : values.end_time,
                        start_date : this.props.resData.reservation_start_date,
                        end_date : this.props.resData.reservation_end_date,
                        timezone : this.props.resData.bike_timezone
                    })
            }, 
            pricingDescription : 'Pricing from Payment Page'
        })

    }

    render() {

        const { 
            resData,
            resID, 
            hasPricingInfo,
            pricingInfo, 
            pricingLoading,
            pricingError 
        } = this.props

        return (

            <Formik
                initialValues={intialValues(resData)}
                onSubmit={(values, {setFieldError, setSubmitting}) => (
                    this.handleForm(setFieldError, values, setSubmitting)
                )}
                render={({ errors, setFieldValue, isSubmitting, values }) => {   
                    return (
                        <React.Fragment>
                            <ErrorMessagePopup 
                                errorMessages={errors}
                                generalHeader={"You're almost there!"}
                                generalMessage={"You're missing some information. Please fill out the following fields."}
                            />       
                        <Form>
                            <div className="row">
                                <div className="col-md-7">
                                    <div>
                                        <PaymentHeader 
                                            resData={resData} 
                                        />
                                        <PaymentTimeSelector 
                                            startDate={values.start_at_date}
                                            endDate={values.end_at_date} 
                                            timezone={resData.bike_timezone}
                                            onChange={(id, value) => {
                                                setFieldValue(id, value)
                                                this.handlePricingLookUp(values, id, value)
                                            }}
                                            startTimeID={'start_time'}
                                            endTimeID={'end_time'}
                                            startError={errors.start_time}
                                            endError={errors.end_time}
                                            sameDayRental={resData.is_same_day_pickup}
                                            startTimeList={resData.start_time_list}
                                            endTimeList={resData.end_time_list}
                                        />
                                        <PaymentRoadSideAssistance 
                                            onChange={(value) => {
                                                this.handlePricingLookUp(values, 'roadside_assistance', value)
                                                setFieldValue('roadside_assistance', value)
                                            }}
                                            defaultValue={true}
                                            dailypriceCents={resData.daily_roadside_price_cents}
                                            dailypriceCurrency={resData.daily_roadside_price_currency}
                                        />
                                        <PaymentTireProtection
                                            onChange={(value) => {
                                                this.handlePricingLookUp(values, 'tire_protection', value)
                                                setFieldValue('tire_protection', value)
                                            }}
                                            defaultValue={true}
                                            dailypriceCents={resData.tire_protection_price_cents}
                                            dailypriceCurrency={resData.tire_protection_price_currency}
                                        />
                                        <div id="insurance-options-wrap">                                                
                                            <InsuranceOptionsInput 
                                                insuranceOptions={this.state.insuranceOptions}  
                                                defaultInsurance={resData.default_insurance}
                                                onChange={(value, name) => {
                                                    this.handlePricingLookUp(values, 'rider_insurance', value)
                                                    setFieldValue('rider_insurance', value)
                                                    setFieldValue('rider_insurance_name', name)
                                                }}   
                                                declinedInsurance={(value) => this.setState({ declinedInsurance : value })}
                                            />
                                        </div>
                                        <PaymentMethodsSection
                                            onChange={(value) => setFieldValue('payments_card_uuid', value)}
                                            paymentMethods={resData.payment_methods}
                                            defaultPaymentMethod={resData.default_payment_method}
                                            paymentError={errors.payments_card_uuid}
                                        >
                                            <PaymentPromoCode 
                                                onApplyCode={(value) => {
                                                    this.handlePricingLookUp(values, 'promotion_code', value)
                                                    setFieldValue('promotion_code', value)
                                                }}
                                                defaultPromoCode={values.promotion_code}
                                                promoCodeCallDescription={'PromoCode Check from bookPayment.js - ' + resID}
                                                onRemoveCode={(value) => setFieldValue('promotion_code', '')}
                                                //For now we need to pass some pricing options into
                                                //this component so that we can get a result back.
                                                //we might still need these in the future if deals
                                                //involve things like bike brand, dates, etc. 
                                                //work this out with Backend better.
                                                pricingOptions={{
                                                    start_at_date: resData.reservation_start_date,
                                                    end_at_date: resData.reservation_end_date,   
                                                    motorcycle_pretty_id : resData.bike_id
                                                }}
                                            />
                                        </PaymentMethodsSection>
                                        <PaymentWelcomeMessage 
                                            onChange={(value) => setFieldValue('message_request', value)}
                                            bikeOwnerName={resData.bike_owner_name}
                                            bikeCity={resData.bike_location.location_city}
                                            messageError={errors.message_request}
                                            ownerAvatarID={resData.bike_owner_avatar_cloudinary_public_id}
                                        />
                                        <PaymentSecurityDeposit />
                                        <PaymentTermsOfService 
                                            onChange={(value) => setFieldValue('terms_of_service', value)}
                                        />
                                            <Button 
                                                className="payment-button desktop" 
                                                primary 
                                                loading={isSubmitting} 
                                                disabled={isSubmitting}
                                                type="submit" 
                                                size="huge"
                                                content="Confirm and Pay" 
                                            />
                                            <div className="tiny-disclaimer">
                                                You will not be charged unless the owner approves your ride.
                                            </div>
                                        </div>
                                        
                                    </div>
                                    {hasPricingInfo && (                
                                        <>
                                            <div className="col-md-4 col-md-offset-1 checkout-summary-column">  
                                                <PaymentRightColumn
                                                    //For right now we need this whole column up top because Promo Codes are intertwined with 
                                                    //The pricing API and I don't want to deal with prop drilling at the moment.
                                                    //The backend should have a ticket to modify this in their backlog.
                                                    startDate={values.start_at_date}
                                                    endDate={values.end_at_date} 
                                                    bikeImageID={resData.bike_image_cloudinary_public_id}
                                                    bikeState={resData.bike_location.location_region_abbr}
                                                    bikeCity={resData.bike_location.location_city}
                                                    bikeYear={resData.bike_year} 
                                                    bikeMake={resData.bike_make} 
                                                    bikeModel={resData.bike_model}
                                                    timezone={resData.bike_timezone}
                                                >
                                                <PricingSummary 
                                                    pricingInfo={pricingInfo} 
                                                    loading={pricingLoading}
                                                    hasPricingInfo={hasPricingInfo}
                                                    hasPricingError={pricingError}        
                                                />
                                                </PaymentRightColumn>
                                            </div>                                        
                                            <PaymentMobileCTAView
                                                pricingInfo={pricingInfo} 
                                                loading={pricingLoading}
                                                hasPricingInfo={hasPricingInfo}
                                                hasPricingError={pricingError}  
                                                resData={resData}
                                                buttonRender={<Button 
                                                    className="payment-button" 
                                                    primary
                                                    disabled={isSubmitting}
                                                    loading={isSubmitting}
                                                    size="big" 
                                                    fluid  
                                                    type="submit" 
                                                    content="Confirm and Pay"
                                                    />}
                                            />
                                        </>
                                    )}
                                </div>
                            </Form>
                </React.Fragment>
            )}} />
        )
    }
}

export default compose(
    withWizard,
    withProcessPayment,
    withRouter,
    withGetPricing
)(PaymentForm)


PaymentForm.defaultProps = {
    resData : {},
    resID : 'ID MISSING',
}