import React, { Component } from 'react'
import { Dropdown, Button } from 'semantic-ui-react'
import { ErrorMessage } from 'formik';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { STRIPE_PUBLISHABLE_KEY } from '../../../../common/constants.js' //not included in examples
import AddPaymentModal from '../../../../account/add-payment-modal.js' //not included in examples
import { paymentTypeInfo } from '../../../../common/util.js' //not included in examples

class PaymentMethodsSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCCForm : false,
            paymentMethodOptions : [],
            selectedPayMethod : this.props.defaultPaymentMethod
        }
    }

    componentDidMount() {

        const { paymentMethods } = this.props

        let paymentMethodOptions = []
        
        if (paymentMethods.length > 0) {
            
            //map the payment methods supplied to key values for the dropdowns

            paymentMethods.map((method, i) => (
                paymentMethodOptions.push({
                    key: method.payment_method_id,
                    text: '****' + method.card_digits + ' ' + method.card_exp_date,
                    value: method.payment_method_id,
                    image: { avatar: false, src: paymentTypeInfo(method.card_type) },
                })
            ))
            
            //Add a new option, last, that will trigger a new payment method pop up when selected
            paymentMethodOptions.push({
                key: 'new',
                text: 'New Payment Method',
                value: 'new',
                image: { avatar: false, src: paymentTypeInfo('add') },
            })

            this.setState({ paymentMethodOptions })
        }
    }


    handlePaymentChange = (e, value) => {
        
        let showForm = false
        
        let paymentMethod = value.value
        
        if (value.value === 'new') {
            showForm = true
            paymentMethod = ''
        }
        
        this.setState({
            selectedPayMethod: paymentMethod,
            showCCForm: showForm
        })
        
        this.props.onChange(paymentMethod)
    }


    reloadPaymentMethods = (newMethodInfo) => {
        
        //console.log(newMethodInfo)
        let paymentMethods = this.state.paymentMethodOptions
        
        paymentMethods.unshift(newMethodInfo)

        this.setState({
            paymentMethodOptions: paymentMethods,
            selectedPayMethod : newMethodInfo.key,
            showCCForm : false,
            hasPaymentMethods : true,
        })
        
        this.props.onChange(newMethodInfo.key)
        
    }

    render() {

        const { paymentMethodOptions, selectedPayMethod, showCCForm  } = this.state
    
        const { paymentError } = this.props
    
        return (
            <div className="box payment-block">
                <div className="row">
                    <div className="col-xs-12 col-md-8">
                        <h3>Payment Information</h3>
                            
                            {paymentMethodOptions.length > 0 && (
                                <div>
                                    <p>Select Payment Method</p>
                                    <Dropdown
                                        placeholder='Payment Method'
                                        fluid
                                        selection
                                        options={paymentMethodOptions}
                                        value={selectedPayMethod}
                                        fieldid="paymentMethodsRadioGroup"
                                        onChange={this.handlePaymentChange}
                                        error={paymentError}
                                    />
                                </div>
                            )}

                            {paymentMethodOptions.length === 0 && ( //if we have no paymethods supplied, then show ui to add a new one
                                <Button 
                                    secondary 
                                    type="button"
                                    onClick={() => {
                                        this.setState({ 
                                            showCCForm : true, 
                                            paymentMethodError: false 
                                        })
                                    }}
                                    content="+ Add Payment Method"
                                />
                            )} 
                            
                            <StripeProvider apiKey={STRIPE_PUBLISHABLE_KEY}>  
                                <Elements>
                                     <AddPaymentModal
                                        modalOpen={showCCForm} 
                                        onClose={() => this.setState({ showCCForm : false })}
                                        onSuccess={this.reloadPaymentMethods}
                                    />   
                                </Elements>
                            </StripeProvider>                              
                            <ErrorMessage className="field-error" component="div" name="payments_card_uuid" />  
                            {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

export default PaymentMethodsSection

PaymentMethodsSection.defaultProps = {
    onChange : function() {},
    paymentMethods : [],
    paymentError : false,
    defaultPaymentMethod : ''
  }
